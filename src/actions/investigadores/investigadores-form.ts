'use server'

import prisma from '@/lib/prisma'
import { Autor } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const getAllInvestigadoresForm = async () => {
  try {
    const users = await prisma.autor.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: { Proyecto: true },
        },
      },
    })
    return users
  } catch (error) {
    throw new Error(`getAllInvestigadoresForm ${error}`)
  }
}

// * INVESTIGADOR + CONTEO
export const getInvestigadorByIdForm = async (id: number) => {
  try {
    const investigador = await prisma.autor.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: { Proyecto: true },
        },
      },
    })
    if (!investigador) return null
    return investigador
  } catch (error) {
    throw new Error('getInvestigadorByIdForm' + error)
  }
}

// * Esquema validación investigador
const investigadorSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),

  name: z.string(),
  email: z.string(),
})

// * Crear actualizar investigador
export const createUpdateInvestigador = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const investigadorParsed = investigadorSchema.safeParse(data)

  if (!investigadorParsed.success) {
    console.log(investigadorParsed.error)
    return { ok: false, error: investigadorParsed.error.message }
  }

  const investigador = investigadorParsed.data
  const { id, ...rest } = investigador

  try {
    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo linea vacía
      let updatedInvestigador: Autor

      // * actualizar
      if (investigador.id) {
        updatedInvestigador = await prisma.autor.update({
          where: { id: investigador.id },
          data: { ...rest },
        })
        // * crear
      } else {
        updatedInvestigador = await prisma.autor.create({
          data: { ...rest },
        })
      }

 

      return {
        updatedInvestigador
      }
    })
    revalidatePath('admin/investigados')
    revalidatePath(`admin/investigado/${prismaTx.updatedInvestigador.id}`)
    return {
      ok: true,
      investigador: prismaTx.updatedInvestigador,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdateInvestigador ${error}` }
  }
}



// *Borrar INVESTIGADOR
export const deleteInvestigador = async (id: number) => {
  try {
    const deletedInvestigador = await prisma.autor.delete({
      where: {
        id,
      },
  
    })


    revalidatePath(`admin/investigadores/`)
    revalidatePath(`/`)
    return deletedInvestigador
  } catch (error) {
    throw new Error(`deleteInvestigador ${error}`)
  }
}
