'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ImagenIndicadores, Multimedia } from '@prisma/client'

import { FaEdit, FaEraser } from 'react-icons/fa'

import { deleteIndicadorById, deleteMapaById, deleteMedioById } from '@/actions'
import { LoaderButton, VideoBg } from '@/components'
import { IoVideocamOutline } from 'react-icons/io5'

interface Props {
  medios: Multimedia[]
}

export const ProjectMediosForm = ({ medios }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDeleteMedio = async (id: number) => {
    setIsLoading(true)

    const medio = await deleteMedioById(id)
    setIsLoading(false)
    alert(`Medio ${medio.title} eliminado con éxito`)
    router.refresh()
  }
  return (
    <div className='mt-4 w-full overflow-hidden border border-gray-200'>
      <table className='min-w-full divide-y divide-gray-700'>
        <thead className='table-sinchi-head table-auto'>
          <tr>
            <th scope='col' className='table-th-header-sinchi w-64'>
              Título
            </th>
            <th scope='col' className='table-th-header-sinchi w-64'>
              Subtítulo
            </th>
            <th scope='col' className='table-th-header-sinchi w-10'>
              Orden
            </th>
            <th scope='col' className='table-th-header-sinchi w-10'>
              Tipo
            </th>
            <th scope='col' className='table-th-header-sinchi w-16'>
              Imagen
            </th>
            <th scope='col' className='text-center w-12'>
              <FaEdit className='mx-auto' />
            </th>
            <th scope='col' className='text-center w-12'>
              <FaEraser className='mx-auto' />
            </th>
          </tr>
        </thead>
        <tbody className='table-body-sinchi'>
          {medios.map((medio) => {
            return (
              <tr key={medio.id} className='row-tabla-sinchi h-28'>
                <td className='table-td-sinchi'>{medio.title}</td>
                <td className='table-td-sinchi'>{medio.subTitle}</td>
                <td className='table-td-sinchi'>{medio.order}</td>
                <td className='table-td-sinchi'>{medio.mediaType}</td>
                <td className='text-center w-20 h-20 justify-center items-center flex '>
                  {medio.mediaType === 'image' ? (
                    <Image
                      src={medio.url ?? '/images/placeholder-img.jpeg'}
                      alt={'Imagen destacada proyecto'}
                      width={120}
                      height={120}
                      className='object-scale-down object-center my-auto mx-auto'
                    />
                  ) : (
                    <VideoBg
                      url={medio.url}
                      width={80}
                      height={60}
                       className=' inset-0 object-fill object-center my-auto'
                    />
                  )}
                </td>
                <td className='table-td-sinchi text-center'>
                  <Link
                    href={`/admin/medio/${medio.id}`}
                    className='btn-primary'
                  >
                    Editar
                  </Link>
                </td>
                <td className='table-td-sinchi text-center'>
                  <button
                    className='btn-danger'
                    onClick={() => onDeleteMedio(medio.id)}
                  >
                    {isLoading ? <LoaderButton /> : 'Eliminar'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
