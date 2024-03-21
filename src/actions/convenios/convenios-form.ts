'use server'

import prisma from '@/lib/prisma'
import { Convenio } from '@prisma/client'

import { z } from 'zod'
import { deleteImage, uploadImagesToStore } from '..'
import { revalidatePath } from 'next/cache'



export const getConvenioByIdForm = async (id: number) => {
  try {
    const convenio = await prisma.convenio.findFirst({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return convenio
  } catch (error) {
    throw new Error(`getConvenioById ${error}`)
  }
}

// * Convenios con imagen y contador
export const getAllConveniosForm = async () => {
  try {
    const convenios = await prisma.convenio.findMany({
      include: {
        imagen: true,
        _count: {
          select: { Proyecto: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return convenios
  } catch (error) {
    throw new Error(`getAllConveniosForm ${error}`)
  }
}

// * Convenios solamente con imagen SIN contador
export const getAllConveniosFormSimple = async () => {
  try {
    const convenios = await prisma.convenio.findMany({
      include: {
        imagen: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return convenios
  } catch (error) {
    throw new Error(`getAllConveniosForm ${error}`)
  }
}

// * CREAR ALIADO

const aliadoSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  name: z.string().min(3).max(100),
})
export const createUpdateConvenio = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const aliadoParsed = aliadoSchema.safeParse(data)

  if (!aliadoParsed.success) {
    console.log(aliadoParsed.error)
    return { ok: false, error: aliadoParsed.error }
  }
  const convenio = aliadoParsed.data

  try {
    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo convenio vacío
      let updatedConvenio: Convenio

      // * actualizar
      if (convenio.id) {
        updatedConvenio = await prisma.convenio.update({
          where: { id: convenio.id },
          data: { name: convenio.name },
        })
        // * crear
      } else {
        updatedConvenio = await prisma.convenio.create({
          data: { name: convenio.name },
        })
      }

      // * carga y guardado de imagen si exists en el formulario la imagen

      if (formData.get('image')) {
        // recibo y envio arreglo
        const images = await uploadImagesToStore([
          formData.get('image'),
        ] as File[])
        // * si no se crean las imagenes, no se actualiza el proyecto
        if (!images) {
          throw new Error('No se pudo cargar la imagen, rolling back')
        }
        //* crear imagen em data base y conectar
        try {
          // * borro la imagen previa si existe
          if (updatedConvenio.idImagen) {
            await prisma.imagen.delete({
              where: { id: updatedConvenio.idImagen },
            })
          }

          // *creo la imagen en la base de datos y la conecto
          const newImage = await prisma.imagen.create({
            data: {
              Convenio: {
                connect: {
                  id: updatedConvenio.id,
                },
              },
              url: images[0]!,
            },
          })

          if (!newImage) throw new Error('No se pudo crear la imagen')
        } catch (error) {
          throw new Error(
            `No se pudo cargar la imagen a la base de datos, revise logs ${error}`
          )
        }
      }
      return {
        updatedConvenio,
      }
    })
    revalidatePath('admin/convenios')
    revalidatePath(`admin/convenio/${prismaTx.updatedConvenio.id}`)
    return {
      ok: true,
      convenio: prismaTx.updatedConvenio,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdateConvenio ${error}` }
  }
}

// * ELIMINAR ALIADO

export const deleteConvenioById = async (id: number) => {
  try {
    const convenio = await prisma.convenio.delete({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })
    revalidatePath(`/`)
    revalidatePath(`/admin/palabras-clave`)

    // * borro la imagen del convenio si existe
    if (convenio.imagen) {
      await deleteImage(convenio.imagen.id, convenio.imagen.url)
    }

    return convenio
  } catch (error) {
    throw new Error(`deleteTagById ${error}`)
  }
}

// *  convenios por proyecto

export const getConveniosByProjectIdForm = async (idProject: number) => {
  try {
    const tags = await prisma.convenio.findMany({
      where: {
        Proyecto: {
          some: {
            id: idProject,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return tags
  } catch (error) {
    throw new Error(`getTagsByProjectIdForm ${error}`)
  }
}



// * ACTUALIZAR CONVENIOS DEL PROYECTO

export const updateConveniosByProjectId = async (
  idProject: number,
  convenios: number[]
) => {
  try {
    const conveniosWhereUniqueInput = convenios.map((convenioId) => ({ id: convenioId }))
    const project = await prisma.proyecto.update({
      where: {
        id: idProject,
      },
      data: {
        convenios: {
          set: conveniosWhereUniqueInput,
        },
      },
    })
    revalidatePath('/')
    revalidatePath(`admin/proyecto/${idProject}`)
    revalidatePath(`admin/convenios/proyecto/${idProject}`)
    revalidatePath(`/proyecto/${idProject}`)

    return { ok: true, project }
  } catch (error) {
    return { ok: false, msg: `updateConveniosByProjectId ${error}` }
  }
}


