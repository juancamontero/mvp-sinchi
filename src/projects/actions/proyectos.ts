'use server'

import prisma from '@/lib/prisma'




export const getProyectosByLineaId = async (idLinea: number) => {
  try {
    const proyectos = await prisma.proyecto.findMany({
      where: {
        idLinea,
      },
      orderBy: {
        year: 'desc',
      },
      include: {
        sellos: true,
      },
    })


    return proyectos
  } catch (error) {
    throw new Error('Error al obtener los proyectos de la línea' + error)
  }
}


export const getProyectosByProgramaId = async (idPrograma: number) => {
  try {
    const proyectos = await prisma.proyecto.findMany({
      where: {
        idPrograma,
      },
      orderBy: {
        year: 'desc',
      },
      include: {
        sellos: true,
      },
    })


    return proyectos
  } catch (error) {
    throw new Error('Error al obtener los proyectos del programa' + error)
  }
}

export const getProyectoById = async (id: number) => {
  try {
    const proyecto = await prisma.proyecto.findUnique({
      where: {
        id,
      },
      include: {
        autor: true,
        linea: {
          select: {
            id: true,
            name: true,
            urlIcon: true
          },
        },
        programa: {
          select: {
            id: true,
            name: true,
            urlIcon: true
          },
        },
        convenios: true,
        regions: true,
        sellos: true,
        tags: true,
      },
    })

    return proyecto
  } catch (error) {
    throw new Error('Error al obtener el proyecto' + error)
  }
}
