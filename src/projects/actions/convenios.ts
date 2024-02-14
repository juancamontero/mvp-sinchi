'use server'

import prisma from '@/lib/prisma'

export const getAllConvenios = async () => {
  try {
    const convenios = await prisma.convenio.findMany({
      include: {
        _count: {
          select: { Proyecto: true },
        },
      },
      orderBy: {
        Proyecto: { _count: 'desc' },
      },
    })

    return convenios
  } catch (error) {
    throw new Error(`getAllConvenios ${error}`)
  }
}

export const getConvenioById = async (id: number) => {
  try {
    const convenio = await prisma.convenio.findFirst({
      where: {
        id,
      },
    })

    return convenio
  } catch (error) {
    throw new Error(`getConvenioById ${error}`)
  }
}
