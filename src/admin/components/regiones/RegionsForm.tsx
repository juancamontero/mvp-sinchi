'use client'

import { deleteRegionById } from '@/actions'
import { Region } from '@prisma/client'

import Link from 'next/link'
import { useState } from 'react'
import { LoaderButton } from '@/components'
import { CreateUpdateRegionForm } from './CreateUpdateRegionForm'

interface Props {
  regions: (Region & { _count: { Proyecto: number } })[]
}

export const RegionsForm = ({ regions }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Seguro quiere borrar la región: [${name}]?`
    )
    if (confirmed) {
      setIsLoading(true)
      const { name } = await deleteRegionById(id)
      setIsLoading(false)
      alert(`Palabra clave [${name}] borrada!`)
    }
  }

  return (
    <div className='mt-2 w-full'>
      <CreateUpdateRegionForm />
      <div className='grid grid-cols-6 gap-1 mt-4 w-full'>
        {regions.map((region) => (
          <div
            key={region.id}
            className={`p-2 border  rounded-sm transition-all text-center bg-bg-200 flex flex-col justify-between`}
          >
            <Link
              className='text-xs font-semibold hover:text-primary-300 flex flex-col'
              href={`/admin/region/${region.id}`}
              title='Editar region'
            >
              {region.name}
              <span className='font-light'>
                ({region._count.Proyecto} proyectos)
              </span>
            </Link>
            <button
              className='btn-delete text-xs p-1 disabled:bg-gray-300 disabled:text-gray-400'
              //! para no borrar departamentos
              disabled={Number(region.id) < 200}
              onClick={() => handleDelete(region.id, region.name)}
            >
              {isLoading ? <LoaderButton /> : 'Eliminar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
