'use client'

import { useState } from 'react'
import { Convenio, Imagen } from '@prisma/client'

import { useForm } from 'react-hook-form'

import clsx from 'clsx'

import { updateConveniosByProjectId } from '@/actions'
import { LoaderButton } from '@/components'
import Image from 'next/image'

interface Props {
  projectId: number
  allConvenios: (Convenio & { imagen: Imagen | null })[]
  projectConvenios: Convenio[]
}

interface FormInputs {
  convenios: number[]
}

export const ProjectConveniosForm = ({
  allConvenios,
  projectConvenios,
  projectId,
}: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const projectConveniosId = projectConvenios.map((convenio) => convenio.id)

  const {
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: { convenios: projectConveniosId },
  })

  watch('convenios')
  const onToggleTerm = (id: number) => {
    const convenios = new Set(getValues('convenios'))
    convenios.has(id) ? convenios.delete(id) : convenios.add(id)
    setValue('convenios', Array.from(convenios))
  }

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true)
    const { ok } = await updateConveniosByProjectId(projectId, data.convenios)
    if (ok) {
      alert('Aliados actualizadas')
    } else alert('Error')
    setIsLoading(false)
  }
  return (
    <div className='mt-2 w-full'>
      <div className='grid grid-cols-4 gap-1 mt-4'>
        {allConvenios.map((convenio) => (
          <div
            key={convenio.id}
            onClick={() => onToggleTerm(convenio.id)}
            className={clsx(
              'p-2 flex flex-row justify-start items-center gap-2 border cursor-pointer rounded-sm transition-all text-center bg-bg-200 hover:bg-bg-300',
              {
                'bg-slate-600 text-white': getValues('convenios').includes(
                  convenio.id
                ),
              }
            )}
          >
             <Image
                    src={convenio.imagen?.url ?? '/images/placeholder-img.jpeg'}
                    alt={'imagen aliado'}
                    width={64}
                    height={64}
                    className='object-scale-down object-center h-full'
                  />
            <p className='text-sm text-left'>{convenio.name}</p>
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
