'use server'

import prisma from '@/lib/prisma'

import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const uploadImages = async (images: File[]) => {
  // * creo todas las promesas
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        // * subo la imagen a cloudinary y me devuelve la url de la imagen
        return cloudinary.uploader
          .upload(`data:${image.type};base64,${base64Image}`)
          .then((r) => r.secure_url)
      } catch (error) {
        console.log(error)
        return null
      }
    })
    //* espero a que todas las promesas se resuelvan y devuelvo las urls de las imagenes
    const uploadedImages = await Promise.all(uploadPromises)
    return uploadedImages
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteProjectImage = async (
  idImage: number | undefined,
  urlImage: string | undefined
) => {
  // * si no hay id o url, no hago nada
  if (!idImage || !urlImage) return
  // * si la imagen es local no hago nada
  if (!urlImage.startsWith('http')) {
    return {
      ok: false,
      error: 'No se pueden borrar imágenes estáticas',
    }
  }
  // * obtengo el nombre de la imagen para usarlo en cloudynary
  const imageName = urlImage?.split('/').pop()?.split('.')[0] ?? ''

  try {
    // * borro de cloudinary
    await cloudinary.uploader.destroy(`proyectos/${imageName}`)
    // * borro de la base de datos de la tab Imagen y el registro del proyecto
    // * recibo arrays de proyectos con esa imagen
    const deletedImage = await prisma.imagen.delete({
      where: {
        id: idImage, //* id de la imagen a borrar
      },
      select: {
        Proyecto: {
          select: {
            id: true, //* id del proyecto
          },
        },
      },
    })

    // * revalido paths de todos los proyectos que tenían esa imagen y el inicio
    revalidatePath(`/`)
    for (let i = 0; i < deletedImage.Proyecto.length; i++) {
      revalidatePath(`/proyecto/${deletedImage.Proyecto[i+1]}`)
      revalidatePath(`/admin/proyecto/${deletedImage.Proyecto[i+1]}`)
    }
  } catch (error) {
    throw new Error(`deleteProjectImage - ${error}`)
  }
}
