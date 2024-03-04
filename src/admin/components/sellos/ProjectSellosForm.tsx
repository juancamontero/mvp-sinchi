'use client'

import { useState } from 'react'
import { Imagen, Sello } from '@prisma/client'

import { useForm } from 'react-hook-form'

import clsx from 'clsx'

import { updateSellosByProjectId } from '@/actions'
import { LoaderButton } from '@/components'
import Image from 'next/image'

interface Props {
  projectId: number
  allSellos: (Sello & { imagen: Imagen | null })[]
  projectSellos: Sello[]
}

interface FormInputs {
  sellos: number[]
}

export const ProjectSellosForm = ({
  allSellos,
  projectSellos,
  projectId,
}: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const projectSellosId = projectSellos.map((sello) => sello.id)

  const {
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: { sellos: projectSellosId },
  })

  watch('sellos')
  const onToggleTerm = (id: number) => {
    const sellos = new Set(getValues('sellos'))
    sellos.has(id) ? sellos.delete(id) : sellos.add(id)
    setValue('sellos', Array.from(sellos))
  }

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true)
    const { ok } = await updateSellosByProjectId(projectId, data.sellos)
    if (ok) {
      alert('Sellos actualizadas')
    } else alert('Error')
    setIsLoading(false)
  }
  return (
    <div className='mt-2 w-full'>
      <div className='grid grid-cols-4 gap-1 mt-4'>
        {allSellos.map((sello) => (
          <div
            key={sello.id}
            onClick={() => onToggleTerm(sello.id)}
            className={clsx(
              'p-2 flex flex-row justify-start items-center gap-2 border cursor-pointer rounded-sm transition-all text-center bg-bg-200 hover:bg-bg-300',
              {
                'bg-slate-600 text-white': getValues('sellos').includes(
                  sello.id
                ),
              }
            )}
          >
            <Image
              src={sello.imagen?.url ?? '/images/placeholder-img.jpeg'}
              alt={'imagen aliado'}
              width={64}
              height={64}
              className='object-scale-down object-center h-full'
            />
            <p className='text-sm text-left'>{sello.name}</p>
          </div>
        ))}
      </div>
      <button
        className='btn-primary w-full mt-2'
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? <LoaderButton /> : 'Guardar'}
      </button>
    </div>
  )
}
