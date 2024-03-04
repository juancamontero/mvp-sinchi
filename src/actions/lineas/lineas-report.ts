'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const getLineaById = async (id: number) => {
  try {
    const linea = await prisma.linea.findFirst({
      where: {
        id,
      },
      include: {
        Programa: true,
        imagen: true,
      },
    })

    return linea
  } catch (error) {
    throw new Error('Error al obtener la linea' + error)
  }
}

export const getAllLineas = async () => {
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
    throw new Error('Error al obtener las lineas ' + error)
  }
}

export const getLineaByProyectoId = async (idProject: number) => {
  try {
    const linea = await prisma.linea.findFirst({
      where: {
        Project: {
          some: {
            id: idProject,
          },
        },
      },
    })

    return linea
  } catch (error) {
    throw new Error('Error al obtener la linea ' + error)
  }
}

// *Borrar línea
export const deleteLinea = async (id: number) => {
  try {
    const deletedLinea = await prisma.linea.delete({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })

    // * si se borra y tiene imagen se borra la imagen
    if (deletedLinea.imagen) {
      await prisma.imagen.delete({
        where: {
          id: deletedLinea.imagen.id,
        },
      })
    }

    revalidatePath(`admin/lineas/`)
    revalidatePath(`/`)
    return deletedLinea
  } catch (error) {
    throw new Error(`deleteLinea ${error}`)
  }
}
