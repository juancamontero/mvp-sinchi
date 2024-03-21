'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useForm } from 'react-hook-form'

import styles from '../AdminStyles.module.css'
import { LoaderButton } from '@/components'
import {
  createUpdateIndicador,
  createUpdateMapa,
  createUpdateMedio,
} from '@/actions'
import { Multimedia } from '@prisma/client'

interface Props {
  proyectoId: number
  medio?: Partial<Multimedia>
}

interface FormInputs {
  title: string
  subTitle: string
  order: number
  mediaType: 'image' | 'video' | ''
  url: string

  image?: FileList
}

export const MedioForm = ({ proyectoId, medio }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { isValid, errors, isSubmitting, dirtyFields },
  } = useForm<FormInputs>({
    defaultValues: {
      title: medio?.title ?? '',
      subTitle: medio?.subTitle ?? '',
      order: medio?.order ?? 0,
      mediaType: medio?.mediaType ?? '',
      url: medio?.url ?? '',

      image: undefined,
    },
  })

  const router = useRouter()
  const previewImage = watch('image')?.[0]
  const previewImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : medio?.url ?? '/images/placeholder-img.jpeg'

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    // * adiciono id del Proyecto
    formData.append('proyectoId', proyectoId.toString())

    // * Si no es nuevo adiciono id del mapa
    if (medio?.id) {
      formData.append('id', medio.id.toString())
    }

    formData.append('title', data.title)
    formData.append('subTitle', data.subTitle)
    formData.append('order', data.order.toString())
    formData.append('mediaType', data.mediaType)

    // * si adicioné imagen la agrego al formulario y si el tipo de medio es imagen
    if (data.image && data.image[0] && data.mediaType === 'image') {
      formData.append('image', data.image[0])
    }

    //* si el tipo de medio es video adiciono el url
    if (data.mediaType === 'video' && data.url.length > 6) {
      formData.append('url', data.url)
    }

    const { ok, error } = await createUpdateMedio(formData)

    if (ok) {
      router.replace(`/admin/medios/proyecto/${proyectoId}`)
      setValue('image', undefined)
      setValue('order', 0)
      setValue('title', '')
      setValue('subTitle', '')
      setValue('mediaType', '')
      setValue('url', '')
    } else {
      alert(error ?? 'Error!')
    }
  }

  const mediaTypes = ['image', 'video']
  const mediaTypeSelected = watch('mediaType')

  return (
    <div className='flex w-full bg-bg-300 flex-col gap-2 justify-between items-center p-2'>
      {/* TITLE */}
      <div className='flex flex-col gap-2 items-stretch w-full'>
        <label htmlFor='title' className={`${styles['form-label']}`}>
          Título(min:3 caracteres, max:200 caracteres)
        </label>
        <input
          className={`${styles['form-input']}`}
          placeholder='Título(min:3 caracteres,  max:200 caracteres)'
          type='text'
          {...register('title', {
            required: true,
            minLength: 3,
            maxLength: 200,
          })}
        />
        {errors.title && (
          <span className={styles['form-error']}>
            Requerido | Mínimo 3, Máximo 200 caracteres
          </span>
        )}

        {/* SUBTITLE */}
        <div className='flex flex-col gap-2 items-stretch w-full'>
          <label htmlFor='subTitle' className={`${styles['form-label']}`}>
            Subtítulo (min:3 caracteres, max:100 caracteres)
          </label>
          <input
            className={`${styles['form-input']}`}
            placeholder='Subtítulo del indicador (min:3 caracteres,  max:100 caracteres)'
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
            Orden del medio respecto a los demás {`(número >0)`}
          </label>
          <input
            className={`${styles['form-input']}`}
            placeholder='Orden del medio respecto a los demás '
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

          {/* TIPO DE MEDIO */}
          <label htmlFor='mediaType' className={`${styles['form-label']}`}>
            Tipo de medio (imagen o video)
          </label>
          <select
            {...register('mediaType', {
              required: true,
            })}
          >
            <option value=''>[Seleccione]</option>
            {mediaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.mediaType && (
            <span className={styles['form-error']}>Requerido</span>
          )}

          <div className='flex flex-col gap-2 items-stretch w-full'>
            {/* URL VIDEO  */}
            {mediaTypeSelected === 'video' && (
              <>
                <label htmlFor='url' className={`${styles['form-label']}`}>
                  URL Video | EnYouTube de Insertar
                  (https://www.youtube.com/embed/XXXX ➡️ id video)
                </label>
                <input
                  className={`${styles['form-input']}`}
                  placeholder='URL Video | EnYouTube de Insertar (https://www.youtube.com/embed/XXXX -> id video)'
                  type='text'
                  {...register('url', {
                    required: false,
                    minLength: 6,
                    maxLength: 100,
                  })}
                />
              </>
            )}

            {errors.url && (
              <span className={styles['form-error']}>
                Mínimo 3, Máximo 100 caracteres
              </span>
            )}

            {/* columna imagen + botones */}
            {mediaTypeSelected === 'image' && (
              <div className='flex flex-row justify-between bg-bg-200 p-2'>
                <label htmlFor='image' className={`${styles['form-label']}`}>
                  Imagen (Formato recomendado (1200px X 800px) | png o web con
                  transparencia )
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
                    alt={'indicador proyecto'}
                    width={400}
                    height={400}
                    className='object-scale-down object-center my-auto mx-auto'
                  />
                </div>
              </div>
            )}
          </div>

          <button
            className='btn-primary w-full'
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderButton />
            ) : (
              <>{medio?.id ? 'Actualizar' : 'Crear'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
