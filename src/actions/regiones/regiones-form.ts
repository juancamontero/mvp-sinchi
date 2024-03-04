'use server'

import prisma from '@/lib/prisma'
import { Region } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// * Todas las REGIONES ordenadas por Nombre 'ASC'
export const getAllRegionsForm = async () => {
  try {
    const regiones = await prisma.region.findMany({
      include: {
        _count: {
          select: { Proyecto: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
    return regiones
  } catch (error) {
    throw new Error(`getAllRegionsForm ${error}`)
  }
}

// ! ELIMINAR REGION

export const deleteRegionById = async (id: number) => {
  try {
    const region = await prisma.region.delete({
      where: {
        id,
      },
    })
    revalidatePath(`/`)
    revalidatePath(`/admin/regiones`)
    return region
  } catch (error) {
    throw new Error(`deleteRegionById ${error}`)
  }
}


// * CREAR REGION

const regionSchema = z.object({
    id: z.coerce
      .number()
      .transform((val) => Number(val))
      .optional()
      .nullable(),
    name: z.string().min(3).max(50),
  })
  export const createUpdateRegion = async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    const regionParsed = regionSchema.safeParse(data)
  
    if (!regionParsed.success) {
      console.log(regionParsed.error)
      return { ok: false, error: regionParsed.error }
    }
  
    try {
      let updatedRegion: Region
      if (regionParsed.data.id) {
        // * actualizar
        updatedRegion = await prisma.region.update({
          where: {
            id: regionParsed.data.id,
          },
          data: {
            name: regionParsed.data.name,
          },
        })
      } else {
        // * Create
        updatedRegion = await prisma.region.create({
          data: {
            name: regionParsed.data.name,
          },
        })
      }
  
      revalidatePath(`/admin/regiones`)
      revalidatePath(`/admin/regiones/${updatedRegion.id}`)
      revalidatePath(`/`)
  
      return {
        ok: true,
        tag: updatedRegion,
      }
    } catch (error) {}
  
    return {
      ok: true,
    }
  }
  

  // * ACTUALIZAR REGIONES DEL PROYECTO

export const updateRegionesByProjectId = async (
  idProject: number,
  regions: number[]
) => {
  try {
    const regiosWhereUniqueInput = regions.map((regionId) => ({ id: regionId }))
    const project = await prisma.proyecto.update({
      where: {
        id: idProject,
      },
      data: {
        regions: {
          set: regiosWhereUniqueInput,
        },
      },
    })
    revalidatePath(`admin/proyecto/${idProject}`)
    revalidatePath(`admin/regiones/proyecto/${idProject}`)
    revalidatePath(`/proyecto/${idProject}`)

    return { ok: true, project }
  } catch (error) {
    return { ok: false, msg: `updateRegionesByProjectId ${error}` }
  }
}


//*  TAGS DEL PROYECTO
export const getRegionsByProjectIdForm = async (idProject: number) => {
  try {
    const tags = await prisma.region.findMany({
      where: {
        Proyecto: {
          some: {
            id: idProject,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return tags
  } catch (error) {
    throw new Error(`getRegionsByProjectIdForm ${error}`)
  }
}