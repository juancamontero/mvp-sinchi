'use server'

import prisma from '@/lib/prisma'

export const getAllProjects = async () => {
  try {
    const projects = await prisma.proyecto.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        linea: true,
        programa: true,
      },
    })
    return projects
  } catch (error) {
    throw new Error(`getAllProjects ${error}`)
  }
}

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
        imagen: true,
      },
    })

    return proyectos
  } catch (error) {
    throw new Error('Error al obtener los proyectos de la línea' + error)
  }
}

export const getProjectsByInvestigadorId = async (idAtutor: number) => {
  try {
    const projects = await prisma.proyecto.findMany({
      where: {
        idAtutor,
      },
      orderBy: {
        year: 'desc',
      },
      include: {
        imagen: true,
      },
    })
    return projects
  } catch (error) {
    throw new Error(`getProjectsByInvestigadorId ${error}`)
  }
}

export const getProjectsByTagId = async (idTag: number) => {
  try {
    const projects = await prisma.proyecto.findMany({
      where: {
        tags: {
          some: {
            id: idTag,
          },
        },
      },
      orderBy: {
        year: 'desc',
      },
      include: {
        imagen: true,
      },
    })
    return projects
  } catch (error) {
    throw new Error(`getProjectsByInvestigadorId ${error}`)
  }
}

export const getProjectsByRegionId = async (idRegion: number) => {
  try {
    const projects = await prisma.proyecto.findMany({
      where: {
        regions: {
          some: {
            id: idRegion,
          },
        },
      },
      orderBy: {
        year: 'desc',
      },
      include: {
        imagen: true,
      },
    })
    return projects
  } catch (error) {
    throw new Error(`getProjectsByRegionId ${error}`)
  }
}

export const getProjectsByConvenioId = async (idConvenio: number) => {
  try {
    const projects = await prisma.proyecto.findMany({
      where: {
        convenios: {
          some: {
            id: idConvenio,
          },
        },
      },
      orderBy: {
        year: 'desc',
      },
      include: {
        imagen: true,
      },
    })
    return projects
  } catch (error) {
    throw new Error(`getProjectsByConvenioId ${error}`)
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
        imagen: true,
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
          include: {
            imagen: true,
          },
        },
        programa: {
          include: {
            imagen: true,
          },
        },
        convenios: {
          include: {
            imagen: true,
          },
        },
        regions: true,
        tags: true,
        imagen: true,
        sellos: {
          include: {
            imagen: true,
          },
        },
        mapasUbicacion: true,
        imagenesIndicadores: true,
        multimedias: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    console.log(proyecto?.multimedias)

    return proyecto
  } catch (error) {
    throw new Error('getProyectoById' + error)
  }
}
