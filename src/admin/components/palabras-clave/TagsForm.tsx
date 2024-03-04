'use client'

import { deleteTagById } from '@/actions'
import { Tag } from '@prisma/client'
import { CreateUpdateTagForm } from './CreateUpdateTagForm'
import Link from 'next/link'
import { useState } from 'react'
import { LoaderButton } from '@/components'

interface Props {
  tags: (Tag & { _count: { Proyecto: number } })[]
}

export const TagsForm = ({ tags }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Seguro quiere borrar la palabra clave: [${name}]?`
    )
    if (confirmed) {
      setIsLoading(true)
      const { name } = await deleteTagById(id)
      setIsLoading(false)
      alert(`Palabra clave [${name}] borrada!`)
    }
  }

  return (
    <div className='mt-2 w-full'>
      <CreateUpdateTagForm />
      <div className='grid grid-cols-6 gap-1 mt-4 w-full'>
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`p-2 border  rounded-sm transition-all text-center bg-bg-200 flex flex-col`}
          >
            <Link
              className='text-xs font-semibold hover:text-primary-300 flex flex-col'
              href={`/admin/palabra-clave/${tag.id}`}
              title='Editar palabra clave'
            >
              {tag.name}
              <span className='font-light'>
              ({tag._count.Proyecto} proyectos)
              </span>
            </Link>
            <button
              className='btn-delete text-xs p-1'
              onClick={() => handleDelete(tag.id, tag.name)}
            >
              {isLoading ? <LoaderButton /> : 'Eliminar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
