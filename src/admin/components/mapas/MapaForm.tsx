'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { MapasUbicacion } from '@prisma/client'

import { useForm } from 'react-hook-form'

import styles from '../AdminStyles.module.css'
import { LoaderButton } from '@/components'
import { createUpdateMapa } from '@/actions'

interface Props {
  proyectoId: number
  mapa?:
    | ({
        Proyecto: {
          name: string
        } | null
      } & {
        id: number
        title: string | null
        subTitle: string | null
        url: string | null
        order: number | null
        proyectoId: number | null
      })
    | null
}

interface FormInputs {
  title: string
  subTitle: string
  order: number

  image?: FileList
}

export const MapaForm = ({ proyectoId, mapa }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { isValid, errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      title: mapa?.title ?? '',
      subTitle: mapa?.subTitle ?? '',
      order: mapa?.order ?? 0,

      image: undefined,
    },
  })

  const router = useRouter()
  const previewImage = watch('image')?.[0]
  const previewImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : mapa?.url ?? '/images/placeholder-img.jpeg'

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    // * adiciono id del Proyecto
    formData.append('proyectoId', proyectoId.toString())

    // * Si no es nuevo adiciono id del mapa
    if (mapa?.id) {
      formData.append('id', mapa.id.toString())
    }

    formData.append('title', data.title)
    formData.append('subTitle', data.subTitle)
    formData.append('order', data.order.toString())

    // * si adicioné imagen la agrego al formulario
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0])
    }

    const { ok } = await createUpdateMapa(formData)

    if (ok) {
      router.replace(`/admin/mapas/proyecto/${proyectoId}`)
      setValue('image', undefined)
      setValue('order', 0)
      setValue('title', '')
      setValue('subTitle', '')
    }
 
  }

  const onDeleteImage = async (id?: number, url?: string) => {
    if (!id || !url) return
    // await deleteImage(id, url, [`/admin/convenio/${convenio?.id}`])
  }

  return (
    <div className='flex w-full bg-bg-300 flex-col gap-2 justify-between items-center p-2'>
      {/* TITLE */}
      <div className='flex flex-col gap-2 items-stretch w-full'>
      <label htmlFor='title' className={`${styles['form-label']}`}>
          Título del mapa (min:3 caracteres, max:50 caracteres)
        </label>
        <input
          className={`${styles['form-input']}`}
          placeholder='Título del mapa (min:3 caracteres,  max:50 caracteres)'
          type='text'
          {...register('title', {
            required: false,
            minLength: 3,
            maxLength: 50,
          })}
        />
        {errors.title && (
          <span className={styles['form-error']}>
            Mínimo 3, Máximo 50 caracteres
          </span>
        )}

        {/* SUBTITLE */}
        <div className='flex flex-col gap-2 items-stretch w-full'>
        <label htmlFor='subTitle' className={`${styles['form-label']}`}>
          subtítulo del mapa (min:3 caracteres, max:100 caracteres)
        </label>
          <input
            className={`${styles['form-input']}`}
            placeholder='Subtítulo del mapa (min:3 caracteres,  max:100 caracteres)'
            type='text'
            {...register('subTitle', {
              required: false,
              minLength: 3,
              maxLength: 100,
            })}
          />
          {errors.subTitle && (
            <span className={styles['form-error']}>
              Mínimo 3, Máximo 100 caracteres
            </span>
          )}

          {/* ORDEN */}
          <label htmlFor='order' className={`${styles['form-label']}`}>
          Orden del mapa respecto a los demás mapas {`(número >0)`}
        </label>
          <input
            className={`${styles['form-input']}`}
            placeholder='Orden del mapa respecto a los demás mapas'
            type='number'
            {...register('order', {
              required: false,
              min: 0,
            })}
          />
          {errors.order && (
            <span className={styles['form-error']}>
              Mínimo 3, Máximo 100 caracteres
            </span>
          )}

          {/* columna imagen + botones */}
          <div className='flex flex-row justify-between bg-bg-200 p-2'>
          <label htmlFor='image' className={`${styles['form-label']}`}>
          Imagen del mapa (Formato recomendado (1200px X 800px) | png o web con transparencia )
        </label>
            <input
              type='file'
              {...register('image')}
              className={`${styles['form-input-image']} w-4/12`}
              accept='image/png, image/jpeg, image/jpg, image/webp'
            />
            <div className='flex flex-col w-8/12 bg-bg-100'>
              <Image
                src={previewImageUrl}
                alt={'Mapa proyecto'}
                width={400}
                height={400}
                className='object-scale-down object-center my-auto mx-auto'
              />
       
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
            <>{mapa?.id ? 'Actualizar' : 'Crear'}</>
          )}
        </button>
      </div>
    </div>
  )
}
