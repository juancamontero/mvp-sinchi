'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ImagenIndicadores } from '@prisma/client'

import { FaEdit, FaEraser } from 'react-icons/fa'

import { deleteIndicadorById, deleteMapaById } from '@/actions'
import { LoaderButton } from '@/components'

interface Props {
  indicadores: ImagenIndicadores[]
}

export const ProjectIndicadoresForm = ({ indicadores }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDeleteIndicador = async (id: number) => {
    setIsLoading(true)
    const indicador = await deleteIndicadorById(id)
    setIsLoading(false)
    alert(`Indicador ${indicador.title} eliminado con éxito`)
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
            <th scope='col' className='table-th-header-sinchi w-80'>
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
          {indicadores.map((indicador) => {
            return (
              <tr key={indicador.id} className='row-tabla-sinchi h-28'>
                <td className='table-td-sinchi'>{indicador.title}</td>
                <td className='table-td-sinchi'>{indicador.subTitle}</td>
                <td className='table-td-sinchi'>{indicador.order}</td>
                <td className='table-td-sinchi w-40 h-40'>
                  <Image
                    src={indicador.url ?? '/images/placeholder-img.jpeg'}
                    alt={'Imagen destacada proyecto'}
                    width={250}
                    height={250}
                  />
                </td>
                <td className='table-td-sinchi text-center'>
                  <Link href={`/admin/indicador/${indicador.id}`} className='btn-primary'>
                    Editar
                  </Link>
                </td>
                <td className='table-td-sinchi text-center'>
                  <button
                    className='btn-danger'
                    onClick={() => onDeleteIndicador(indicador.id)}
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

