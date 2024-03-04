'use server'

import prisma from '@/lib/prisma'
import { Programa } from '@prisma/client'
import { z } from 'zod'
import { uploadImagesToStore } from '..'
import { revalidatePath } from 'next/cache'

// * PROGRAMA SIMPLE
export const getAllProgramasSimple = async () => {
  try {
    const programas = await prisma.programa.findMany({
      orderBy: {
        order: 'asc',
      },
      
    })

    return programas
  } catch (error) {
    throw new Error('Error al obtener los programas' + error)
  }
}

// * PROGRAMA + IMAGEN
export const getAllProgramasForm = async () => {
  try {
    const programas = await prisma.programa.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        imagen: true,
      },
    })

    return programas
  } catch (error) {
    throw new Error('getAllLineasForm ' + error)
  }
}

// * PROGRAMA + IMAGEN
export const getProgramaByIdForm = async (id: number) => {
  try {
    const programa = await prisma.programa.findFirst({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })
    if (!programa) return null
    return programa
  } catch (error) {
    throw new Error('getProgramaByIdForm' + error)
  }
}

// * Esquema validación programa
const programaSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  order: z.coerce.number().transform((val) => Number(val)),
  baseColor: z.string().optional().nullable(),
  preTitle: z.string().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
})

// * Crear actualizar programa
export const createUpdatePrograma = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const programaParsed = programaSchema.safeParse(data)

  if (!programaParsed.success) {
    console.log(programaParsed.error)
    return { ok: false, error: programaParsed.error.message }
  }

  const programa = programaParsed.data
  const { id, ...rest } = programa

  try {
    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo linea vacía
      let updatedPrograma: Programa

      // * actualizar
      if (programa.id) {
        updatedPrograma = await prisma.programa.update({
          where: { id: programa.id },
          data: { ...rest },
        })
        // * crear
      } else {
        updatedPrograma = await prisma.programa.create({
          data: { ...rest },
        })
      }

      // * carga y guardado de imagen si exists en el formulario la imagen

      if (formData.get('image')) {
        // recibo y envio arreglo
        const images = await uploadImagesToStore([
          formData.get('image'),
        ] as File[])
        // * si no se crean las imagenes, no se actualiza el programa
        if (!images) {
          throw new Error('No se pudo cargar la imagen, rolling back')
        }
        //* crear imagen em data base y conectar
        try {
          // * borro la imagen previa si existe
          if (updatedPrograma.idImagen) {
            await prisma.imagen.delete({
              where: { id: updatedPrograma.idImagen },
            })
          }

          // *creo la imagen en la base de datos y la conecto
          const newImage = await prisma.imagen.create({
            data: {
              Programa: {
                connect: {
                  id: updatedPrograma.id,
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
        updatedPrograma,
      }
    })
    revalidatePath('admin/programas')
    revalidatePath(`admin/programa/${prismaTx.updatedPrograma.id}`)
    return {
      ok: true,
      programa: prismaTx.updatedPrograma,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdatePrograma ${error}` }
  }
}



// *Borrar PROGRAMA
export const deletePrograma = async (id: number) => {
  try {
    const deletedPrograma = await prisma.programa.delete({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })

    // * si se borra y tiene imagen se borra la imagen
    if (deletedPrograma.imagen) {
      await prisma.imagen.delete({
        where: {
          id: deletedPrograma.imagen.id,
        },
      })
    }

    revalidatePath(`admin/programa/`)
    revalidatePath(`/`)
    return deletedPrograma
  } catch (error) {
    throw new Error(`deletePrograma ${error}`)
  }
}