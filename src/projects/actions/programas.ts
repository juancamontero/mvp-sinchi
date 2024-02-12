'use server'

import prisma from '@/lib/prisma'

export const getAllProgramas = async () => {
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

export const getProgramaById = async (id: number) => {
  try {
    const programa = await prisma.programa.findUnique({
      where: {
        id: id,
      },
      include: {
        Linea: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return programa
  } catch (error) {}
}
