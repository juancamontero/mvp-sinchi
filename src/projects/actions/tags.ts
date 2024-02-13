'use server'

import prisma from '@/lib/prisma'

export const getAllTags = async () => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { Proyecto: true },
        },
      },
      orderBy: {
        Proyecto: { _count: 'desc' },
      },
    })

    return tags
  } catch (error) {
    throw new Error(`getAllTags ${error}`)
  }
}

export const getTagById = async (id: number) => {
  try {
    const tag = await prisma.tag.findFirst({
      where: {
        id,
      },
    })

    return tag
  } catch (error) {
    throw new Error(`getTagById ${error}`)
  }
}
