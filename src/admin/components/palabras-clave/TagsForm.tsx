'use client'

import { deleteTagById } from '@/actions'
import { Tag } from '@prisma/client'
import { CreateUpdateTagForm } from './CreateUpdateTagForm'
import Link from 'next/link'

interface Props {
  tags: Tag[]
}
const handleDelete = async (id: number, name: string) => {
  const confirmed = window.confirm(
    `Seguro quiere borrar la palabra clave: [${name}]?`
  )
  if (confirmed) {
    const { name } = await deleteTagById(id)
    alert(`Palabra clave [${name}] borrada!`)
  }
}
export const TagsForm = ({ tags }: Props) => {
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
              className='text-xs font-semibold hover:text-primary-300'
              href={`/admin/palabra-clave/${tag.id}`}
              title='Editar palabra clave'
            >
              {tag.name}
            </Link>
            <button
              className='btn-delete text-xs p-1'
              onClick={() => handleDelete(tag.id, tag.name)}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
