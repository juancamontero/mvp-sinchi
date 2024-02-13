'use server'

import prisma from '@/lib/prisma'


export const getAllRegiones = async () => {
    try {
      const regiones = await prisma.region.findMany({
        include: {
          _count: {
            select: { Proyecto: true },
          },
        },
        orderBy: {
          Proyecto: { _count: 'desc' },
        },
      })
      return regiones
    } catch (error) {
      throw new Error(`getAllRegiones ${error}`)
    }
  }

  export const getRegionById = async (id: number) => {
    try {
      const region = await prisma.region.findFirst({
        where: {
          id,
        },
      })
  
      return region
    } catch (error) {
      throw new Error(`getRegionById ${error}`)
    }
  }