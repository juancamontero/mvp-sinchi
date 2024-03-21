'use client'
import Image from 'next/image'

import { LoaderButton } from '@/components'
import { Convenio, Imagen } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../AdminStyles.module.css'
import { useRouter } from 'next/navigation'
import { createUpdateConvenio, createUpdateSello, deleteImage } from '@/actions'

interface Props {
  convenio?: Partial<Convenio> & { imagen: Imagen | null }
}
interface FormInputs {
  name: string
  image?: FileList
}

export const CreateUpdateConvenioForm = ({ convenio }: Props) => {
  // * set react hook form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      name: convenio?.name ?? '',
      image: undefined,
    },
  })

  const router = useRouter()
  const previewImage = watch('image')?.[0]
  const previewImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : convenio?.imagen?.url ?? '/images/placeholder-img.jpeg'

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    if (convenio?.id) {
      formData.append('id', convenio.id.toString())
    }
    formData.append('name', data.name)

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0])
    }

    await createUpdateConvenio(formData)
    setValue('image', undefined)
    setValue('name', '')
    router.replace('/admin/convenios')
  }

  const onDeleteImage = async (id?: number, url?: string) => {
    if (!id || !url) return
    await deleteImage(id, url, [`/admin/convenio/${convenio?.id}`])
  }

  return (
    <div className='flex w-full bg-bg-300 flex-col gap-2 justify-between items-center p-2'>
      {/* NOMBRE */}

      <div className='flex flex-col gap-2 items-stretch w-full'>
        <input
          className={`${styles['form-input']}`}
          placeholder='Aliado - Nombre a mostrar si no existe la imagen (min:3 caracteres,  max:100 caracteres)'
          {...register('name', { required: true, minLength: 3, maxLength: 100 })}
        />
        {errors.name && (
          <span className={styles['form-error']}>
            Requerido | Mínimo 3, Máximo 100 caracteres
          </span>
        )}
        {/* columna imagen + botones */}
        <div className='flex flex-row justify-between bg-bg-200 p-2'>
          <input
            type='file'
            {...register('image')}
            className={`${styles['form-input-image']} w-2/12`}
            accept='image/png, image/jpeg, image/jpg, image/webp'
          />
          <div className='flex flex-col h-80 w-80 bg-bg-150'>
            <Image
              src={previewImageUrl}
              alt={'logo aliado'}
              width={144}
              height={144}
              className='object-scale-down object-center my-auto p-2 m-auto'
            />
            <button
              type='button'
              onClick={() =>
                onDeleteImage(convenio?.imagen?.id, convenio?.imagen?.url)
              }
              className='btn-danger w-full rounded-b-xl '
            >
              Eliminar imagen
            </button>
          </div>
        </div>
      </div>

      <button
        className='btn-primary w-full'
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderButton />
        ) : (
          <>{convenio?.id ? 'Actualizar' : 'Crear'}</>
        )}
      </button>
    </div>
  )
}
