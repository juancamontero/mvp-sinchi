'use client'
import { updateRegionesByProjectId, updateTagsByProjectId } from '@/actions'
import { CreateUpdateRegionForm, CreateUpdateTagForm } from '@/admin'
import { LoaderButton } from '@/components'
import { Region, Tag } from '@prisma/client'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  projectId: number
  allRegions: Region[]
  projectRegions: Region[]
}

interface FormInputs {
  regions: number[]
}

export const ProjectRegionsForm = ({ allRegions,  projectRegions, projectId }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const projectRegionsId = projectRegions.map((region) => region.id)

  const {
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: { regions: projectRegionsId },
  })

  watch('regions')
  const onToggleTerm = (id: number) => {
    const regions = new Set(getValues('regions'))
    regions.has(id) ? regions.delete(id) : regions.add(id)
    setValue('regions', Array.from(regions))
  }

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true)
    const { ok } = await updateRegionesByProjectId(projectId, data.regions)
    if (ok) {
      alert('Regiones del proyecto clave actualizadas')
    } else alert('Error')
    setIsLoading(false)
  }
  return (
    <div className='mt-2 w-full'>
      <CreateUpdateRegionForm />
      <div className='grid grid-cols-6 gap-1 mt-4'>
        {allRegions.map((region) => (
          <div
            key={region.id}
            onClick={() => onToggleTerm(region.id)}
            className={clsx(
              '  p-2 border cursor-pointer rounded-sm transition-all text-center bg-bg-200 hover:bg-bg-300',
              {
                'bg-slate-600 text-white': getValues('regions').includes(region.id),
              }
            )}
          >
            <p className='text-sm'>{region.name}</p>
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
