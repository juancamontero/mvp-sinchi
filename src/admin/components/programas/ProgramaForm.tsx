'use client'
import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Imagen, Programa } from '@prisma/client'
import { useForm } from 'react-hook-form'

import { LoaderButton } from '@/components'

import styles from '../AdminStyles.module.css'
import { TitleAdmin } from '@/admin'
import {  createUpdatePrograma, deleteImage, deletePrograma } from '@/actions'

interface Props {
  programa: Partial<Programa> & { imagen?: Imagen | null }
}

interface FormInputs {
  preTitle: string
  baseColor: string
  name: string
  order: number
  description: string


  image: FileList
}

export const ProgramaForm = ({ programa }: Props) => {
  //* Loader deletes

  const [isLoading, setIsLoading] = useState(false)
  // * Form definitions
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      order: programa?.order ?? 0,
      baseColor: programa?.baseColor ?? '',
      preTitle: programa?.preTitle ?? '',
      name: programa?.name ?? '',
      description: programa?.description ?? '',

      image: undefined,
    },
  })

  const router = useRouter()

  // * preview image
  const previewImage = watch('image')?.[0]
  const previewImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : programa?.imagen?.url ?? '/images/placeholder-img.jpeg'

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()
    const { image, ...lineaToSave } = data

    if (programa.id) formData.append('id', programa.id.toString() ?? '')

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


    if (image && image[0]) {
      formData.append('image', image[0])
    }
    // TODO
    const { ok, programa: updatedPrograma } = await createUpdatePrograma(formData)
    if (ok) {
      router.replace(`/admin/programa/${updatedPrograma!.id}`)
      alert('Programa actualizado/creado correctamente!')
    } else alert('Error, mo se pudo crear o actualizar el programa')
  }

  // * borrar imagen
  const onDeleteImage = async (id?: number, url?: string) => {
    if (!id || !url) return
    await deleteImage(id, url, [`/admin/programa/${programa?.id}`])
  }

  // * borrar programa

  const onClickDeletePrograma = async () => {
    if (!programa.id) return
    setIsLoading(true)

    const confirmDelete = confirm(
      `¿Estás seguro de que quieres eliminar el programa ${programa.name}?`
    )

    // TODO
    if (confirmDelete) {
      const deletedLinea = await deletePrograma(programa!.id!)
      alert(`Programa con id:${deletedLinea.id}`)
      router.replace('/admin/programas')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex flex-col justify-start items-start p-2 rounded-sm border w-full'>
      <TitleAdmin
        title={programa?.name ?? 'Sin nombre'}
        subTitle={`Línea: ${
          programa?.id ? programa.preTitle : 'Sin definir'
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
              Nombre programa
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
              Color (para el texto y se acá se obtienen el resto de colores del programa)
            </label>
            <input
              type='color'
              className={`${styles['form-input']} w-1/5 h-full`}
              {...register('baseColor')}
            />
          </div>

          {/* ORDEN */}
          <label htmlFor='order' className={`${styles['form-label']}`}>
            Orden (para ordenar respecto a los demás programas)
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
            onClick={() => onDeleteImage(programa?.imagen?.id, programa?.imagen?.url)}
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

      <button
        className='btn-primary w-full mt-2'
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? <LoaderButton /> : 'Guardar'}
      </button>
      <button className='btn-danger w-full mt-2' onClick={onClickDeletePrograma}>
        {isLoading ? <LoaderButton /> : 'Borrar programa'}
      </button>
    </div>
  )
}
