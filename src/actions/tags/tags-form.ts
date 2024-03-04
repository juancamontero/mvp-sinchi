'use server'

import prisma from '@/lib/prisma'
import { Tag } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { z } from 'zod'

export const getAllTagsForm = async () => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { Proyecto: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return tags
  } catch (error) {
    throw new Error(`getAllTagsForm ${error}`)
  }
}
//*  TAGS DEL PROYECTO
export const getTagsByProjectIdForm = async (idProject: number) => {
  try {
    const tags = await prisma.tag.findMany({
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
    throw new Error(`getTagsByProjectIdForm ${error}`)
  }
}

// * ACTUALIZAR PALABRAS CLAVE DEL PROYECTO

export const updateTagsByProjectId = async (
  idProject: number,
  tags: number[]
) => {
  try {
    const tagsWhereUniqueInput = tags.map((tagId) => ({ id: tagId }))
    const project = await prisma.proyecto.update({
      where: {
        id: idProject,
      },
      data: {
        tags: {
          set: tagsWhereUniqueInput,
        },
      },
    })
    revalidatePath(`admin/proyecto/${idProject}`)
    revalidatePath(`admin/palabras-clave/proyecto/${idProject}`)
    revalidatePath(`/proyecto/${idProject}`)

    return { ok: true, project }
  } catch (error) {
    return { ok: false, msg: `updateTagsByProjectId ${error}` }
  }
}


// ! ELIMINAR PALABRA CLAVE

export const deleteTagById = async (id: number) => {
  try {
    const tags = await prisma.tag.delete({
      where: {
        id,
      },
    })
    revalidatePath(`/`)
    revalidatePath(`/admin/palabras-clave`)
    return tags
  } catch (error) {
    throw new Error(`deleteTagById ${error}`)
  }
}


// * CREAR PALABRA CLAVE

const tagSchema = z.object({
  id: z.coerce
    .number()
    .transform((val) => Number(val))
    .optional()
    .nullable(),
  name: z.string().min(3).max(50),
})
export const createUpdateTag = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const tagParsed = tagSchema.safeParse(data)

  if (!tagParsed.success) {
    console.log(tagParsed.error)
    return { ok: false, error: tagParsed.error }
  }

  try {
    let updatedTag: Tag
    if (tagParsed.data.id) {
      // * actualizar
      updatedTag = await prisma.tag.update({
        where: {
          id: tagParsed.data.id,
        },
        data: {
          name: tagParsed.data.name,
        },
      })
    } else {
      // * Create
      updatedTag = await prisma.tag.create({
        data: {
          name: tagParsed.data.name,
        },
      })
    }

    revalidatePath(`/admin/palabras-clave`)
    revalidatePath(`/admin/palabra-clave/${updatedTag.id}`)
    revalidatePath(`/`)

    return {
      ok: true,
      tag: updatedTag,
    }
  } catch (error) {}

  return {
    ok: true,
  }
}
