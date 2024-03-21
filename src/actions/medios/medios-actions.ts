'use server'

import prisma from '@/lib/prisma'

import { deleteImageByUrl, uploadImagesToStore } from '..'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { MediaType, Multimedia } from '@prisma/client'
import { error } from 'console'

//* TODOS LOS MEDIOS CON EL NOMBRE DEL PROYECTO

export const getMediosByProjectId = async (idProject: number) => {
  try {
    const medios = await prisma.multimedia.findMany({
      where: {
        proyectoId: idProject,
      },
      include: {
        Proyecto: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })

    return medios
  } catch (error) {
    throw new Error(`getMediosByProjectId ${error}`)
  }
}

// * ELIMINAR MEDIO

export const deleteMedioById = async (id: number) => {
  try {
    const medio = await prisma.multimedia.delete({
      where: {
        id,
      },
    })
    revalidatePath(`/proyecto/${medio.proyectoId}`)
    revalidatePath(`/admin/medios/proyecto/${medio.proyectoId}`)

    // * borro la imagen del store si existe
    if (medio.url && medio.mediaType === 'image' && medio.url.length > 6) {
      await deleteImageByUrl(medio.url)
    }

    return medio
  } catch (error) {
    throw new Error(`deleteMedioById ${error}`)
  }
}

//* MEDIO POR ID CON EL NOMBRE DEL PROYECTO
export const getMedioById = async (id: number) => {
  try {
    const medio = await prisma.multimedia.findUnique({
      where: {
        id,
      },
      include: {
        Proyecto: {
          select: {
            name: true,
          },
        },
      },
    })

    return medio
  } catch (error) {
    throw new Error(`getMedioById ${error}`)
  }
}

// * CREAR / ACTUALIZAR MEDIO

const medioSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  proyectoId: z.coerce.number().transform((val) => Number(val)),
  order: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  title: z.string().min(3).max(200),
  subTitle: z.string().max(100).optional().nullable(),
  url: z.string().max(100).optional().nullable(),
  mediaType: z.nativeEnum(MediaType),
})

export const createUpdateMedio = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData)
    const medioParsed = medioSchema.safeParse(data)
  

    if (!medioParsed.success) {
      console.log(medioParsed.error)
      throw new Error(medioParsed.error.message) 
    }
    const medio = medioParsed.data

    const { id, url, ...rest } = medio

    // * si es imagen no adiciono el url por acá
    const dataToUpdate =
      medio.mediaType === 'image' ? { ...rest } : { ...rest, url }
    //! de acá para arriba estaba fuera del try catch

    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo convenio vacío
      let updatedMedio: Multimedia

      // * actualizar
      if (id) {
        updatedMedio = await prisma.multimedia.update({
          where: { id },
          data: dataToUpdate,
        })
        // * crear
      } else {
        updatedMedio = await prisma.multimedia.create({
          data: dataToUpdate,
        })
      }

      // * borro la imagen previa del store si el medio es una imagen, si existía , si tengo imagen en el formulario
      if (
        medio.mediaType === 'image' &&
        updatedMedio.url &&
        updatedMedio.url?.length > 6 &&
        formData.get('image')
      ) {
        await deleteImageByUrl(updatedMedio.url)
      }

      // * carga y guardado de imagen si existe en el formulario la imagen y el tipo es imagen
      if (medio.mediaType === 'image' && formData.get('image')) {
        // recibo y envio arreglo
        const images = await uploadImagesToStore([
          formData.get('image'),
        ] as File[])

        // * si no se crean las imagenes, no se actualiza el proyecto
        if (!images) {
          throw new Error('No se pudo cargar la imagen, rolling back')
        }

        //* Actualizo el mediocon el url nuevo de la imagen
        try {
          // *creo la imagen en la base de datos y la conecto
          updatedMedio = await prisma.multimedia.update({
            where: { id: updatedMedio.id },
            data: {
              url: images[0]!,
            },
          })
        } catch (error) {
          throw new Error(
            `No se pudo cargar la imagen a la base de datos, revise logs ${error}`
          )
        }
      }

      return {
        updatedMedio,
      }
    })
    revalidatePath(`/admin/medios/proyecto/${prismaTx.updatedMedio.proyectoId}`)
    revalidatePath(`/proyecto/${prismaTx.updatedMedio.proyectoId}`)
    return {
      ok: true,
      medio: prismaTx.updatedMedio,
    }
  } catch (error) {

    return { ok: false, error: `Error: ${error}` }
  }
}
