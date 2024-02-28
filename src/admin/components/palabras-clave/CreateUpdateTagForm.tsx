'use client'

import { useForm } from 'react-hook-form'

import { Tag } from '@prisma/client'

import { createUpdateTag } from '@/actions'

import styles from '../AdminStyles.module.css'

interface FormInputs {
  name: string
}

interface Props {
  tag?: Partial<Tag>
}
//todo validation, prima update , prisma delete

export const CreateUpdateTagForm = ({ tag }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      name: tag?.name ?? '',
    },
  })

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()
    if (tag?.id) {
      formData.append('id', tag.id.toString())
    }
    formData.append('name', data.name)
    const { ok } = await createUpdateTag(formData)
  }

  return (
    <div className='flex w-full bg-bg-300 flex-col gap-2 justify-between items-center p-2'>
      {/* NOMBRE */}
      {/* <div className='flex flex-col  w-4/5'> */}
        <input
          className={`${styles['form-input']}`}
          placeholder='Palabra clave (min:3 caracteres,  max:50 caracteres)'
          {...register('name', { required: true, minLength: 3, maxLength: 50 })}
        />
      {/* </div> */}
      <button className='btn-primary w-full' onClick={handleSubmit(onSubmit)}>
       {tag?.id ? 'Actualizar' : 'Crear'}
      </button>
    </div>
  )
}
