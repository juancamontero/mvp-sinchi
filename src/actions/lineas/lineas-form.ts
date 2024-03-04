'use server'

import prisma from '@/lib/prisma'
import { Linea } from '@prisma/client'

import { z } from 'zod'
import { uploadImagesToStore } from '..'
import { revalidatePath } from 'next/cache'

export const getAllLineasForm = async () => {
  try {
    const lineas = await prisma.linea.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        imagen: true,
      },
    })

    return lineas
  } catch (error) {
    throw new Error('getAllLineasForm ' + error)
  }
}

// * LINEA + IMAGEN
export const getLineaByIdForm = async (id: number) => {
  try {
    const linea = await prisma.linea.findFirst({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })
    if (!linea) return null
    return linea
  } catch (error) {
    throw new Error('getLineaByIdForm' + error)
  }
}

// * LINEA + PROGRAMAS
export const getLineaByIdProgramasForm = async (id: number) => {
  try {
    const linea = await prisma.linea.findFirst({
      where: {
        id,
      },
      include: {
        Programa: true,
      },
    })
    if (!linea) return null
    return linea
  } catch (error) {
    throw new Error('getLineaByIdProgramasForm' + error)
  }
}

// * Esquema validación línea
const lineaSchema = z.object({
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
  purpose: z.string().optional().nullable(),
  millestone1: z.string().optional().nullable(),
  millestone2: z.string().optional().nullable(),
  millestone3: z.string().optional().nullable(),
})

// * Crear actualizar línea
export const createUpdateLinea = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const lineaParsed = lineaSchema.safeParse(data)

  if (!lineaParsed.success) {
    console.log(lineaParsed.error)
    return { ok: false, error: lineaParsed.error.message }
  }

  const linea = lineaParsed.data
  const { id, ...rest } = linea

  try {
    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo linea vacía
      let updatedLinea: Linea

      // * actualizar
      if (linea.id) {
        updatedLinea = await prisma.linea.update({
          where: { id: linea.id },
          data: { ...rest },
        })
        // * crear
      } else {
        updatedLinea = await prisma.linea.create({
          data: { ...rest },
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
          if (updatedLinea.idImagen) {
            await prisma.imagen.delete({
              where: { id: updatedLinea.idImagen },
            })
          }

          // *creo la imagen en la base de datos y la conecto
          const newImage = await prisma.imagen.create({
            data: {
              Linea: {
                connect: {
                  id: updatedLinea.id,
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
        updatedLinea,
      }
    })
    revalidatePath('admin/lineas')
    revalidatePath(`admin/linea/${prismaTx.updatedLinea.id}`)
    return {
      ok: true,
      linea: prismaTx.updatedLinea,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdateLinea ${error}` }
  }
}

// * ACTUALIZAR PROGRAMAS DE LA LINEA

export const updateProgramasByLineaId = async (
  idLinea: number,
  programas: number[]
) => {
  try {
    const programasWhereUniqueInput = programas.map((programasId) => ({
      id: programasId,
    }))
    const linea = await prisma.linea.update({
      where: {
        id: idLinea,
      },
      data: {
        Programa: {
          set: programasWhereUniqueInput,
        },
      },
    })
    revalidatePath('/')
    revalidatePath(`admin/linea/${idLinea}`)
    revalidatePath(`admin/programas/linea/${idLinea}`)
    revalidatePath(`/linea/${idLinea}`)

    return { ok: true, linea }
  } catch (error) {
    return { ok: false, msg: `updateProgramasByLineaId ${error}` }
  }
}
