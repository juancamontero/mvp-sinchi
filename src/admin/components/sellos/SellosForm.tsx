'use client'

import { LoaderButton } from '@/components'
import { Convenio, Imagen, Sello } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { CreateUpdateConvenioForm } from '../convenios/CreateUpdateConvenioForm'
import { deleteConvenioById, deleteSelloById } from '@/actions'
import { CreateUpdateSellosForm } from '@/admin'

interface Props {
  sellos: (Sello & { imagen: Imagen | null } & {
    _count: { Proyecto: number }
  })[]
}

export const SellosForm = ({ sellos }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Seguro quiere borrar el aliado: [${name}]?`
    )
    if (confirmed) {
      setIsLoading(true)
      const { name } = await deleteSelloById(id)
      setIsLoading(false)
      alert(`Sello [${name}] borrado!`)
    }
  }

  return (
    <div className='mt-2 w-full'>
      <CreateUpdateSellosForm />
      <div className='grid grid-cols-4 gap-1 mt-2 w-full'>
        {sellos.map((sello) => (
          <div
            key={sello.id}
            className={`p-2 border  rounded-sm transition-all text-center bg-bg-200 flex flex-col justify-between`}
          >
            <div className='flex flex-row-reverse gap-1 justify-between items-center mb-1'>
              {/* Imagen */}
              <Image
                src={sello.imagen?.url ?? '/images/placeholder-img.jpeg'}
                alt={'imagen aliado'}
                width={100}
                height={100}
                className='object-scale-down object-center '
              />

              {/* aliado + count */}
              <Link
                className='text-xs font-semibold hover:text-primary-300 flex flex-col text-left'
                href={`/admin/sello/${sello.id}`}
                title='Editar aliado'
              >
                {sello.name}
                <span className='font-light'>
                  ({sello._count.Proyecto} proyectos)
                </span>
              </Link>
            </div>
            <button
              className='btn-delete text-xs p-1'
              onClick={() => handleDelete(sello.id, sello.name)}
            >
              {isLoading ? <LoaderButton /> : 'Eliminar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
