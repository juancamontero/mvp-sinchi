'use server'


import prisma from '@/lib/prisma'


export const getAllInvestigadores = async () => {
  try {
    const users = await prisma.autor.findMany({
      include: {
        _count: {
          select: { Proyecto: true },
        },
      },
      orderBy: {
        Proyecto: { _count: 'desc' },
      },
    })
    return users
  } catch (error) {
    throw new Error(`getAllUsers ${error}`)
  }
}

export const getInvestigadorById = async (id: number) => {
  try {
    const investigador = await prisma.autor.findFirst({
      where: {
        id,
      },
    })

    return investigador
  } catch (error) {
    throw new Error(`getInvestigadorById ${error}`)
  }
}
