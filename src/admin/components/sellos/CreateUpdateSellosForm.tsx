'use client'
import Image from 'next/image'

import { LoaderButton } from '@/components'
import { Imagen, Sello } from '@prisma/client'

import { useForm } from 'react-hook-form'

import styles from '../AdminStyles.module.css'
import { useRouter } from 'next/navigation'
import { createUpdateSello, deleteImage } from '@/actions'

interface Props {
  sello?: Partial<Sello> & { imagen: Imagen | null }
}
interface FormInputs {
  name: string
  order: number
  image?: FileList
}

export const CreateUpdateSellosForm = ({ sello }: Props) => {
  // * set react hook form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: sello?.name ?? '',
      order: sello?.order ?? undefined,
      image: undefined,
    },
  })

  const router = useRouter()
  const previewImage = watch('image')?.[0]
  const previewImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : sello?.imagen?.url ?? '/images/placeholder-img.jpeg'

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    if (sello?.id) {
      formData.append('id', sello.id.toString())
    }
    formData.append('name', data.name)
    formData.append('order', data.order.toString())

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0])
    }

    await createUpdateSello(formData)
    setValue('image', undefined)
    setValue('name', '')
    setValue('order', 99)
    router.refresh()
  }

  const onDeleteImage = async (id?: number, url?: string) => {
    if (!id || !url) return
    await deleteImage(id, url, [`/admin/sello/${sello?.id}`])
  }

  return (
    <div className='flex w-full bg-bg-300 flex-col gap-2 justify-between items-center p-2'>
      {/* NOMBRE */}

      <div className='flex flex-col gap-2 items-stretch w-full'>
        {/* NAME */}
        <label htmlFor='name' className={`${styles['form-label']}`}>
          Nombre sello
        </label>
        <input
          className={`${styles['form-input']}`}
          placeholder='Aliado - Nombre a mostrar si no existe la imagen (min:3 caracteres,  max:150 caracteres)'
          {...register('name', {
            required: true,
            minLength: 3,
            maxLength: 150,
          })}
        />
        {errors.name && (
          <span className={styles['form-error']}>
            Requerido | Mínimo 3, Máximo 50 caracteres
          </span>
        )}
        {/* ORDEN */}
        <label htmlFor='order' className={`${styles['form-label']}`}>
          Orden (número)
        </label>
        <input
          className={`${styles['form-input']}`}
          placeholder='Orden en que se ordena respecto a los demás sellos'
          {...register('order', { required: true, min: 0 })}
        />{' '}
        {errors.order && (
          <span className={styles['form-error']}>
            Requerido | número mayor a cero
          </span>
        )}
        {/* columna imagen + botones */}
        <div className='flex flex-row justify-between bg-bg-200 p-2'>
          <input
            type='file'
            {...register('image')}
            className={`${styles['form-input-image']} w-2/5`}
            accept='image/png, image/jpeg, image/jpg, image/webp'
          />
          <div className='flex flex-col'>
            <Image
              src={previewImageUrl}
              alt={'logo aliado'}
              width={144}
              height={144}
              className='object-scale-down object-center my-auto'
            />
            <button
              type='button'
              onClick={() =>
                onDeleteImage(sello?.imagen?.id, sello?.imagen?.url)
              }
              className='btn-danger w-full rounded-b-xl '
            >
              Eliminar imagen
            </button>
          </div>
        </div>
      </div>

      <button className='btn-primary w-full' onClick={handleSubmit(onSubmit)}>
        {isSubmitting ? (
          <LoaderButton />
        ) : (
          <>{sello?.id ? 'Actualizar' : 'Crear'}</>
        )}
      </button>
    </div>
  )
}
