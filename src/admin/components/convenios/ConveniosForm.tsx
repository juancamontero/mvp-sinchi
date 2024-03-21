'use client'

import { LoaderButton } from '@/components'
import { Convenio, Imagen } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { CreateUpdateConvenioForm } from './CreateUpdateConvenioForm'
import { deleteConvenioById } from '@/actions'
import { AccordionForForm } from '@/admin'

interface Props {
  convenios: (Convenio & { imagen: Imagen | null } & {
    _count: { Proyecto: number }
  })[]
}

export const ConveniosForm = ({ convenios }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Seguro quiere borrar el aliado: [${name}]?`
    )
    if (confirmed) {
      setIsLoading(true)
      const { name } = await deleteConvenioById(id)
      setIsLoading(false)
      alert(`Aliado [${name}] borrado!`)
    }
  }

  return (
    <div className='mt-2 w-full'>

      {/* NUEVO CONVENIO */}
      <AccordionForForm title='Crear aliado'>
        <CreateUpdateConvenioForm />
      </AccordionForForm>
      <div className='grid grid-cols-4 gap-1 mt-2 w-full'>
        {convenios.map((convenio) => (
          <div
            key={convenio.id}
            className={`p-2 border  rounded-sm transition-all text-center bg-bg-200 flex flex-col justify-between`}
          >
            <div className='flex flex-row-reverse gap-1 justify-between items-center mb-1'>
              {/* Imagen */}
              <Image
                src={convenio.imagen?.url ?? '/images/placeholder-img.jpeg'}
                alt={'imagen aliado'}
                width={100}
                height={100}
                className='object-scale-down object-center '
              />

              {/* aliado + count */}
              <Link
                className='text-xs font-semibold hover:text-primary-300 flex flex-col text-left'
                href={`/admin/convenio/${convenio.id}`}
                title='Editar aliado'
              >
                {convenio.name}
                <span className='font-light'>
                  ({convenio._count.Proyecto} proyectos)
                </span>
              </Link>
            </div>
            <button
              className='btn-delete text-xs p-1'
              onClick={() => handleDelete(convenio.id, convenio.name)}
            >
              {isLoading ? <LoaderButton /> : 'Eliminar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
