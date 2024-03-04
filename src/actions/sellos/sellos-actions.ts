'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { deleteImage, uploadImagesToStore } from '..'
import { z } from 'zod'
import { Sello } from '@prisma/client'

// * Sellos con imagen y contador
export const getAllSellosForm = async () => {
  try {
    const sellos = await prisma.sello.findMany({
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

    return sellos
  } catch (error) {
    throw new Error(`getAllSellosForm ${error}`)
  }
}

// ! ELIMINAR SELLO

export const deleteSelloById = async (id: number) => {
  try {
    const convenio = await prisma.sello.delete({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })
    revalidatePath(`/`)
    revalidatePath(`/admin/sellos`)

    // * borro la imagen del convenio si existe
    if (convenio.imagen) {
      await deleteImage(convenio.imagen.id, convenio.imagen.url)
    }

    return convenio
  } catch (error) {
    throw new Error(`deleteSelloById ${error}`)
  }
}

// * CREAR SELLO

const selloSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  name: z.string().min(3).max(150),
  order: z.coerce.number().transform((val) => Number(val)),
})
export const createUpdateSello = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const selloParsed = selloSchema.safeParse(data)

  if (!selloParsed.success) {
    console.log(selloParsed.error)
    return { ok: false, error: selloParsed.error }
  }
  const sello = selloParsed.data

  try {
    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo sello vacío
      let updatedSello: Sello

      // * actualizar
      if (sello.id) {
        updatedSello = await prisma.sello.update({
          where: { id: sello.id },
          data: { name: sello.name },
        })
        // * crear
      } else {
        updatedSello = await prisma.sello.create({
          data: { name: sello.name, order: sello.order },
        })
      }

      // * carga y guardado de imagen si existe en el formulario la imagen

      if (formData.get('image')) {
        // recibo y envio arreglo
        const images = await uploadImagesToStore([
          formData.get('image'),
        ] as File[])
        // * si no se crean las imagenes, no se actualiza
        if (!images) {
          throw new Error('No se pudo cargar la imagen, rolling back')
        }
        //* crear imagen em data base y conectar
        try {
          // * borro la imagen previa si existe
          if (updatedSello.idImagen) {
            await prisma.imagen.delete({
              where: { id: updatedSello.idImagen },
            })
          }

          // *creo la imagen en la base de datos y la conecto
          const newImage = await prisma.imagen.create({
            data: {
              Sello: {
                connect: {
                  id: updatedSello.id,
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
        updatedSello,
      }
    })
    revalidatePath('admin/sellos')
    revalidatePath(`admin/sellos/${prismaTx.updatedSello.id}`)
    return {
      ok: true,
      convenio: prismaTx.updatedSello,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdateSello ${error}` }
  }
}

export const getSelloByIdForm = async (id: number) => {
  try {
    const convenio = await prisma.sello.findFirst({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })

    return convenio
  } catch (error) {
    throw new Error(`getSelloByIdForm ${error}`)
  }
}


// * Sellos solamente con imagen SIN contador
export const getAllSellosFormSimple = async () => {
  try {
    const convenios = await prisma.sello.findMany({
      include: {
        imagen: true,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return convenios
  } catch (error) {
    throw new Error(`getAllSellosFormSimple ${error}`)
  }
}



// *  sellos por proyecto

export const getSellosByProjectIdForm = async (idProject: number) => {
  try {
    const tags = await prisma.sello.findMany({
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
    throw new Error(`getSellosByProjectIdForm ${error}`)
  }
}

// * ACTUALIZAR SELLOS DEL PROYECTO

export const updateSellosByProjectId = async (
  idProject: number,
  sellos: number[]
) => {
  try {
    const sellosWhereUniqueInput = sellos.map((sello) => ({ id: sello }))
    const project = await prisma.proyecto.update({
      where: {
        id: idProject,
      },
      data: {
        sellos: {
          set: sellosWhereUniqueInput,
        },
      },
    })

    revalidatePath('/')
    revalidatePath(`admin/proyecto/${idProject}`)
    revalidatePath(`admin/sellos/proyecto/${idProject}`)
    revalidatePath(`/proyecto/${idProject}`)

    return { ok: true, project }
  } catch (error) {
    return { ok: false, msg: `updateSellosByProjectId ${error}` }
  }
}
