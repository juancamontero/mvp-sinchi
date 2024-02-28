'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { Proyecto } from '@prisma/client'

import { z } from 'zod'

import { uploadImages } from '..'

const projectSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  idLinea: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  idPrograma: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  idAtutor: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  equipo: z.string().optional().nullable(),
  completed: z.string().transform((val) => val === 'true'),
  year: z.coerce.number().transform((val) => Number(val)),
  name: z.string(),
  objetivo: z.string().optional().nullable(),
  products: z.string().optional().nullable(),
  places: z.string().optional().nullable(),
  importancia: z.string().optional().nullable(),
  pertinencia: z.string().optional().nullable(),
  impacto: z.string().optional().nullable(),
})

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const projectParsed = projectSchema.safeParse(data)

  if (!projectParsed.success) {
    console.log(projectParsed.error)
    return { ok: false, error: projectParsed.error.message }
  }

  const project = projectParsed.data

  const { id, ...rest } = project

  // * Prisma transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Creo proyecto vacío
      let updatedProject: Proyecto

      if (id) {
        //* Actualizar
        updatedProject = await prisma.proyecto.update({
          where: { id },
          data: { ...rest },
        })
        // console.log(updatedProject)
      } else {
        //* crear
      
        updatedProject = await prisma.proyecto.create({
          data: {
            ...rest,
          },
        })
      }

      // * carga y guardado de imagen si exists en el formulario la imagen
      if (formData.get('image')) {
        // recibo y envio arreglo
        const images = await uploadImages([formData.get('image')] as File[])
        // * si no se crean las imagenes, no se actualiza el proyecto
        if (!images) {
          throw new Error('No se pudo cargar la imagen, rolling back')
        }

        try {
          // * borro la imagen previa si existe
          if (updatedProject.idImagen) {
            await prisma.imagen.delete({
              where: { id: updatedProject.idImagen },
            })
          }

          const newImage = await prisma.imagen.create({
            data: {
              Proyecto: {
                connect: {
                  id: updatedProject.id,
                },
              },
              url: images[0]!,
            },
          })

          if (!newImage) throw new Error('No se pudo crear la imagen')
        } catch (error) {
          throw new Error(
            `No se pudo cargar la imagen a la base de datos, revise logs ${error}`
          )
        }
      }

      return {
        updatedProject,
      }
    })

    revalidatePath(`admin/proyecto/${project.id}`)
    revalidatePath(`/proyecto/${project.id}`)

    return {
      ok: true,
      project: prismaTx.updatedProject,
    }
  } catch (error) {
    console.log(error)
    return { ok: false, msg: `createUpdateProduct ${error}` }
  }
}

export const getProyectoByIdSimple = async (id: number) => {
  try {
    const proyecto = await prisma.proyecto.findUnique({
      where: {
        id,
      },
      include: {
        imagen: true,
      },
    })
    if (!proyecto) return null
    return { ...proyecto, urlImagen: proyecto?.imagen?.url }
  } catch (error) {
    throw new Error('Error al obtener el proyecto' + error)
  }
}

export const getAllProjectsForm = async () => {
  try {
    const projects = await prisma.proyecto.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        imagen: true,
        linea: true,
        programa: true,
      },
    })
    return projects
  } catch (error) {
    throw new Error(`getAllProjects ${error}`)
  }
}
