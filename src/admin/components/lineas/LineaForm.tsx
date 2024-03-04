'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Imagen, Linea } from '@prisma/client'
import { useForm } from 'react-hook-form'

import { LoaderButton } from '@/components'

import styles from '../AdminStyles.module.css'
import { TitleAdmin } from '@/admin'
import { createUpdateLinea, deleteImage, deleteLinea } from '@/actions'
import { useState } from 'react'

interface Props {
  linea: Partial<Linea> & { imagen?: Imagen | null }
}

interface FormInputs {
  order: number
  preTitle: string
  baseColor: string
  name: string
  description: string
  purpose: string
  millestone1: string
  millestone2: string
  millestone3: string

  image: FileList
}

export const LineaForm = ({ linea }: Props) => {
  //* Loader deletes

  const [isLoading, setIsLoading] = useState(false)
  // * Form definitions
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      order: linea?.order ?? 0,
      baseColor: linea?.baseColor ?? '',
      preTitle: linea?.preTitle ?? '',
      name: linea?.name ?? '',
      description: linea?.description ?? '',
      purpose: linea?.purpose ?? '',
      millestone1: linea?.millestone1 ?? '',
      millestone2: linea?.millestone2 ?? '',
      millestone3: linea?.millestone3 ?? '',

      image: undefined,
    },
  })

  const router = useRouter()

  // * preview image
  const previewImage = watch('image')?.[0]
  const previewImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : linea?.imagen?.url ?? '/images/placeholder-img.jpeg'

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()
    const { image, ...lineaToSave } = data

    if (linea.id) formData.append('id', linea.id.toString() ?? '')

    formData.append('name', lineaToSave.name)
    formData.append('preTitle', lineaToSave.preTitle)

    // ! si se usa negro no se envia la info la back
    // todo: Fix
    if (data.baseColor !== '#000000') {
      console.log(data.baseColor)

      formData.append('baseColor', lineaToSave.baseColor)
    }
    formData.append('order', lineaToSave.order.toString())
    formData.append('description', lineaToSave.description)
    formData.append('purpose', lineaToSave.purpose)
    formData.append('millestone1', lineaToSave.millestone1)
    formData.append('millestone2', lineaToSave.millestone2)
    formData.append('millestone3', lineaToSave.millestone3)

    if (image && image[0]) {
      formData.append('image', image[0])
    }

    const { ok, linea: updatedLinea } = await createUpdateLinea(formData)

    if (ok) {
      router.replace(`/admin/linea/${updatedLinea!.id}`)
      alert('Línea actualizado/creado correctamente!')
    } else alert('Error, mo se pudo crear o actualizar la línea')
  }

  // * borrar imagen
  const onDeleteImage = async (id?: number, url?: string) => {
    if (!id || !url) return
    await deleteImage(id, url, [`/admin/linea/${linea?.id}`])
  }

  // * borrar línea

  const onClickDeleteLinea = async () => {
    if (!linea.id) return
    setIsLoading(true)

    const confirmDelete = confirm(
      `¿Estás seguro de que quieres eliminar la línea ${linea.name}`
    )
    if (confirmDelete) {
      const deletedLinea = await deleteLinea(linea!.id!)
      alert(`Linea con id:${deletedLinea.id}`)
    }
    setIsLoading(false)
    router.replace('/admin/lineas')
  }

  return (
    <div className='flex flex-col justify-start items-start p-2 rounded-sm border w-full'>
      <TitleAdmin
        title={linea?.name ?? 'Sin nombre'}
        subTitle={`Línea: ${
          linea?.id ? linea.preTitle : 'Sin definir'
        } | Edición / Eliminación`}
      />

      {/* Títulos, orden , imagen y color */}
      <div className='flex flex-row justify-start items-stretch w-full gap-3'>
        <div className='flex flex-col mb-2 w-4/5'>
          {/* Pre título */}
          <label htmlFor='preTitle' className={`${styles['form-label']}`}>
            Pre - título
          </label>
          <input
            type='text'
            placeholder='Texto que precede nombre línea y se usa como texto del botón  (min 3 max 15)'
            className={`${styles['form-input']}`}
            {...register('preTitle', {
              required: false,
              minLength: 3,
              maxLength: 15,
            })}
          />
          {errors.preTitle && (
            <span className={styles['form-error']}>
              Mínimo 3, Máximo 15 letras
            </span>
          )}
          {/* NOMBRE */}
          <div className='flex flex-col mb-2'>
            <label htmlFor='name' className={`${styles['form-label']}`}>
              Nombre línea
            </label>
            <input
              type='text'
              className={`${styles['form-input']} h-full`}
              {...register('name', { required: true, minLength: 5 })}
            />
            {errors.name && (
              <span className={styles['form-error']}>
                Requerido | Mínimo 5 letras
              </span>
            )}
          </div>

          {/* COLOR */}
          <div className='flex flex-row justify-between mb-2 items-stretch w-full'>
            <label
              htmlFor='baseColor'
              className={`${styles['form-label']} w-4/5`}
            >
              Color (para el texto y se acá se obtienen el resto de colores de
              la línea)
            </label>
            <input
              type='color'
              className={`${styles['form-input']} w-1/5 h-full`}
              {...register('baseColor')}
            />
          </div>

          {/* ORDEN */}
          <label htmlFor='order' className={`${styles['form-label']}`}>
            Orden (para ordenar respecto a las demás líneas)
          </label>
          <input
            type='number'
            className={`${styles['form-input']} h-full`}
            {...register('order', { required: true })}
          />
          {errors.order && (
            <span className={styles['form-error']}>Requerido</span>
          )}
        </div>

        {/* IMAGEN */}
        <div className='flex flex-col mb-2 w-1/5 '>
          <label htmlFor='urlImage' className={`${styles['form-label']}`}>
            Logo / ícono
          </label>
          <input
            type='file'
            {...register('image')}
            className={`${styles['form-input-files']}`}
            accept='image/png, image/jpeg, image/jpg, image/webp'
          />

          <Image
            src={previewImageUrl}
            alt={'Imagen proyecto'}
            width={200}
            height={200}
            className='mx-auto py-2'
          />

          <button
            type='button'
            onClick={() => onDeleteImage(linea?.imagen?.id, linea?.imagen?.url)}
            className='btn-danger w-full rounded-b-xl '
          >
            {isLoading ? <LoaderButton /> : 'Eliminar imagen'}
          </button>
        </div>
        {/* IMAGEN ENDS */}
      </div>

      {/* DESCRIPCION */}
      <div className='flex flex-col mb-2 w-full'>
        <label htmlFor='description' className={`${styles['form-label']}`}>
          Descripción
        </label>
        <textarea
          rows={8}
          className={`${styles['form-input']}`}
          {...register('description', { required: false })}
        />
      </div>
      {/* PROPÓSITO */}
      <div className='flex flex-col mb-2 w-full'>
        <label htmlFor='purpose' className={`${styles['form-label']}`}>
          Propósito
        </label>
        <textarea
          rows={8}
          className={`${styles['form-input']}`}
          {...register('purpose', { required: false })}
        />
      </div>
      {/* MILESTONES |HITOS */}
      <div className='flex flex-row justify-start items-start gap-2 w-full'>
        {/* Hito 1 */}
        <div className='flex flex-col mb-2 w-1/3'>
          <label htmlFor='millestone1' className={`${styles['form-label']}`}>
            Hito 1
          </label>
          <textarea
            rows={8}
            className={`${styles['form-input']}`}
            {...register('millestone1', { required: false })}
          />
        </div>
        {/* Hito 2 */}
        <div className='flex flex-col mb-2 w-1/3'>
          <label htmlFor='millestone2' className={`${styles['form-label']}`}>
            Hito 2
          </label>
          <textarea
            rows={8}
            className={`${styles['form-input']}`}
            {...register('millestone2', { required: false })}
          />
        </div>
        {/* Hito 3 */}
        <div className='flex flex-col mb-2 w-1/3'>
          <label htmlFor='millestone3' className={`${styles['form-label']}`}>
            Hito 3
          </label>
          <textarea
            rows={8}
            className={`${styles['form-input']}`}
            {...register('millestone3', { required: false })}
          />
        </div>
      </div>

      <button
        className='btn-primary w-full mt-2'
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? <LoaderButton /> : 'Guardar'}
      </button>
      <button className='btn-danger w-full mt-2' onClick={onClickDeleteLinea}>
        {isLoading ? <LoaderButton /> : 'Borrar línea'}
      </button>
    </div>
  )
}
