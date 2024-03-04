'use client'
import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Imagen, Programa, Autor } from '@prisma/client'
import { useForm } from 'react-hook-form'

import { LoaderButton } from '@/components'

import styles from '../AdminStyles.module.css'
import { TitleAdmin } from '@/admin'
import { createUpdateInvestigador, deleteImage, deleteInvestigador, deletePrograma } from '@/actions'

interface Props {
  investigador:
    | Partial<Autor> &
        ({
          _count?: {
            Proyecto: number
          }
        } | null)
}

interface FormInputs {
  name: string
  email: string
}

export const InvestigadorForm = ({ investigador }: Props) => {
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
      name: investigador?.name ?? '',
      email: investigador?.email ?? '',
    },
  })

  const router = useRouter()

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    if (investigador.id) formData.append('id', investigador.id.toString() ?? '')

    formData.append('name', data.name)
    formData.append('email', data.email)

    // TODO
    const { ok, investigador: updatedInvestigador } = await createUpdateInvestigador(
      formData
    )
    if (ok) {
      router.replace(`/admin/investigador/${updatedInvestigador!.id}`)
      alert('Investigador actualizado/creado correctamente!')
    } else alert('Error, mo se pudo crear o actualizar el investigador')
  }


  // * borrar investigador

  const onClickDeleteInvestigador = async () => {
    if (!investigador.id) return
    setIsLoading(true)

    const confirmDelete = confirm(
      `¿Estás seguro de que quieres eliminar el investigador ${investigador.name}?`
    )

    // TODO
    if (confirmDelete) {
      const deletedInvestigador = await deleteInvestigador(investigador!.id!)
      alert(`Borrado :${deletedInvestigador.id}`)
      router.replace('/admin/investigadores')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex flex-col justify-start items-start p-2 rounded-sm border w-full'>
      <TitleAdmin
        title={investigador?.name ?? 'Sin nombre'}
        subTitle={`# Proyectos: ${
          investigador?.id ? investigador._count?.Proyecto ?? 0 : 'Sin proyectos'
        } | Edición / Eliminación`}
      />

      {/*  */}
      <div className='flex flex-col justify-start items-stretch w-full gap-3'>
        <div className='flex flex-col mb-2 w-full'>
          {/* NOMBRE */}
          <div className='flex flex-col mb-2'>
            <label htmlFor='name' className={`${styles['form-label']}`}>
              Nombre investigador
            </label>
            <input
              type='text'
              className={`${styles['form-input']} h-full`}
              {...register('name', {
                required: true,
                minLength: 5,
                maxLength: 50,
              })}
            />
            {errors.name && (
              <span className={styles['form-error']}>
                Requerido | Mínimo 5 / máximo 50 letras,
              </span>
            )}
          </div>
          {/* MAIL */}
          <div className='flex flex-col mb-2'>
            <label htmlFor='name' className={`${styles['form-label']}`}>
              EMail (no debe haber otro igual en la base de datos)
            </label>
            <input
              type='email'
              className={`${styles['form-input']} h-full`}
              {...register('email', {
                required: true,
                minLength: 5,
                maxLength: 50,
              })}
            />
            {errors.name && (
              <span className={styles['form-error']}>
                Requerido | Mínimo 5 / máximo 50 letras,
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        className='btn-primary w-full mt-2'
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? <LoaderButton /> : 'Guardar'}
      </button>
      <button
        className='btn-danger w-full mt-2'
        onClick={onClickDeleteInvestigador}
      >
        {isLoading ? <LoaderButton /> : 'Borrar investigador'}
      </button>
    </div>
  )
}
