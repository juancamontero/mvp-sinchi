'use client'

import { useForm } from 'react-hook-form'

import { Tag } from '@prisma/client'

import { createUpdateRegion } from '@/actions'

import styles from '../AdminStyles.module.css'
import { useState } from 'react'
import { LoaderButton } from '@/components'

interface FormInputs {
  name: string
}

interface Props {
  region?: Partial<Tag>
}
//todo validation, prima update , prisma delete

export const CreateUpdateRegionForm = ({ region }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      name: region?.name ?? '',
    },
  })

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()
    if (region?.id) {
      formData.append('id', region.id.toString())
    }
    formData.append('name', data.name)
    setIsLoading(true)
    await createUpdateRegion(formData)
    setIsLoading(false)
    setValue('name', '')
  }

  return (
    <div className='flex w-full bg-bg-300 flex-col gap-2 justify-between items-center p-2'>
      {/* NOMBRE */}
      {/* <div className='flex flex-col  w-4/5'> */}
      <input
        className={`${styles['form-input']}`}
        placeholder='Región (min:3 caracteres,  max:50 caracteres)'
        {...register('name', { required: true, minLength: 3, maxLength: 50 })}
      />
      {/* </div> */}
      <button className='btn-primary w-full' onClick={handleSubmit(onSubmit)}>
        {isLoading ? <LoaderButton /> : <>{region?.id ? 'Actualizar' : 'Crear'}</>}
      </button>
    </div>
  )
}
