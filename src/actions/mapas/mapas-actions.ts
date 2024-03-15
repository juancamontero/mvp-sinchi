'use server'

import prisma from '@/lib/prisma'
import { MapasUbicacion } from '@prisma/client'
import { z } from 'zod'
import {  deleteImageByUrl, uploadImagesToStore } from '..'
import { revalidatePath } from 'next/cache'

//* TODOS LOS MAPAS CON EL NOMBRE DEL PROYECTO

export const getMapasByProjectId = async (idProject: number) => {
  try {
    const mapas = await prisma.mapasUbicacion.findMany({
      where: {
        proyectoId: idProject,
      },
      include: {
        Proyecto: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })
    
    return mapas
  } catch (error) {
    throw new Error(`getMapasByProjectId ${error}`)
  }
}

//* MAPA POR ID CON EL NOMBRE DEL PROYECTO
export const getMapaById = async (id: number) => {
  try {
    const mapa = await prisma.mapasUbicacion.findUnique({
      where: {
        id,
      },
      include: {
        Proyecto: {
          select: {
            name: true,
          },
        },
      },
    })

    return mapa
  } catch (error) {
    throw new Error(`getMapaById ${error}`)
  }
}

// * CREAR / ACTUALIZAR MAPA

const mapaSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  proyectoId: z.coerce.number().transform((val) => Number(val)),
  order: z.coerce.number().transform((val) => Number(val)),
  title: z.string().min(3).max(50),
  subTitle: z.string().min(3).max(100),
})

export const createUpdateMapa = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const mapaParsed = mapaSchema.safeParse(data)

  if (!mapaParsed.success) {
    console.log(mapaParsed.error)
    return { ok: false, error: mapaParsed.error }
  }
  const mapa = mapaParsed.data

  const { id, ...rest } = mapa

  try {
    // * prisma transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      //Creo convenio vacío
      let updatedMapa: MapasUbicacion

      // * actualizar
      if (id) {
        updatedMapa = await prisma.mapasUbicacion.update({
          where: { id },
          data: { ...rest },
        })
        // * crear
      } else {
        updatedMapa = await prisma.mapasUbicacion.create({
          data: { ...rest },
        })
      }

      // * borro la imagen previa del store si existe y si tengo imagen en el formulario
      if (
        updatedMapa.url &&
        updatedMapa.url?.length > 6 &&
        formData.get('image')
      ) {
        
        
        console.log("entre a borrar imagen")
        
        
        await deleteImageByUrl(updatedMapa.url)
      }

      // * carga y guardado de imagen si existe en el formulario la imagen
      if (formData.get('image')) {
      
        // recibo y envio arreglo
        const images = await uploadImagesToStore([
          formData.get('image'),
        ] as File[])
  
        // * si no se crean las imagenes, no se actualiza el proyecto
        if (!images) {
          throw new Error('No se pudo cargar la imagen, rolling back')
        }

        //* Actualizo el mapa con el url nuevo de la imagen
        try {
          // *creo la imagen en la base de datos y la conecto
          updatedMapa = await prisma.mapasUbicacion.update({
            where: { id: updatedMapa.id },
            data: {
              url: images[0]!,
            },
          })
        } catch (error) {
          throw new Error(
            `No se pudo cargar la imagen a la base de datos, revise logs ${error}`
          )
        }
      }

      return {
        updatedMapa,
      }
    })
    revalidatePath(`/admin/mapas/proyecto/${prismaTx.updatedMapa.proyectoId}`)
    revalidatePath(`/proyecto/${prismaTx.updatedMapa.proyectoId}`)
    return {
      ok: true,
      mapa: prismaTx.updatedMapa,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdateMapa ${error}` }
  }
}


// * ELIMINAR MAPA

export const deleteMapaById = async (id: number) => {
    try {
      const mapa = await prisma.mapasUbicacion.delete({
        where: {
          id,
        },
       
      })
      revalidatePath(`/proyecto/${mapa.proyectoId}`)
      revalidatePath(`/admin/mapas/proyecto/${mapa.proyectoId}`)
  
      // * borro la imagen del convenio si existe
      if (mapa.url && mapa.url.length > 6) {
        await deleteImageByUrl(mapa.url)
      }
  
      return mapa
    } catch (error) {
      throw new Error(`deleteMapaById ${error}`)
    }
  }