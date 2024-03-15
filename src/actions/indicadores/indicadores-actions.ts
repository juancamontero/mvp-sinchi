'use server'

import prisma from '@/lib/prisma'
import { ImagenIndicadores } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { deleteImageByUrl, uploadImagesToStore } from '..'

//* TODAS LAS IMGS-INDICADORES CON EL NOMBRE DEL PROYECTO

export const getIndicadoresByProjectId = async (idProject: number) => {
  try {
    const indicadores = await prisma.imagenIndicadores.findMany({
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

    return indicadores
  } catch (error) {
    throw new Error(`getIndicadoresByProjectId ${error}`)
  }
}


//* INDICADOR POR ID CON EL NOMBRE DEL PROYECTO
export const getIndicadorById = async (id: number) => {
  try {
    const indicador = await prisma.imagenIndicadores.findUnique({
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

    return indicador
  } catch (error) {
    throw new Error(`getIndicadorById ${error}`)
  }
}

// * CREAR / ACTUALIZAR INDICADOR

const indicadorSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  proyectoId: z.coerce.number().transform((val) => Number(val)),
  order: z.coerce.number().transform((val) => Number(val)),
  title: z.string().min(3).max(50),
  subTitle: z.string().min(3).max(100),
})

export const createUpdateIndicador = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const indicadorParsed = indicadorSchema.safeParse(data)

  if (!indicadorParsed.success) {
    console.log(indicadorParsed.error)
    return { ok: false, error: indicadorParsed.error }
  }
  const indicador = indicadorParsed.data

  const { id, ...rest } = indicador

  try {
    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo convenio vacío
      let updatedIndicador: ImagenIndicadores

      // * actualizar
      if (id) {
        updatedIndicador = await prisma.imagenIndicadores.update({
          where: { id },
          data: { ...rest },
        })
        // * crear
      } else {
        updatedIndicador = await prisma.imagenIndicadores.create({
          data: { ...rest },
        })
      }

      // * borro la imagen previa del store si existe y si tengo imagen en el formulario
      if (
        updatedIndicador.url &&
        updatedIndicador.url?.length > 6 &&
        formData.get('image')
      ) {
        await deleteImageByUrl(updatedIndicador.url)
      }

      // * carga y guardado de imagen si existe en el formulario la imagen
      if (formData.get('image')) {
        // recibo y envio arreglo
        const images = await uploadImagesToStore([
          formData.get('image'),
        ] as File[])

        // * si no se crean las imagenes, no se actualiza el proyecto
        if (!images) {
          throw new Error('No se pudo cargar la imagen, rolling back')
        }

        //* Actualizo el indicador con el url nuevo de la imagen
        try {
          // *creo la imagen en la base de datos y la conecto
          updatedIndicador = await prisma.imagenIndicadores.update({
            where: { id: updatedIndicador.id },
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
        updatedIndicador,
      }
    })
    revalidatePath(`/admin/indicadores/proyecto/${prismaTx.updatedIndicador.proyectoId}`)
    revalidatePath(`/proyecto/${prismaTx.updatedIndicador.proyectoId}`)
    return {
      ok: true,
      mapa: prismaTx.updatedIndicador,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdateIndicador ${error}` }
  }
}



// * ELIMINAR INDICADOR

export const deleteIndicadorById = async (id: number) => {
    try {
      const indicador = await prisma.imagenIndicadores.delete({
        where: {
          id,
        },
       
      })
      revalidatePath(`/proyecto/${indicador.proyectoId}`)
      revalidatePath(`/admin/indicadores/proyecto/${indicador.proyectoId}`)
  
      // * borro la imagen del store si existe
      if (indicador.url && indicador.url.length > 6) {
        await deleteImageByUrl(indicador.url)
      }
  
      return indicador
    } catch (error) {
      throw new Error(`deleteIndicadorById ${error}`)
    }
  }