'use server'

import prisma from '@/lib/prisma'



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
      }
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
