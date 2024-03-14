'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { MapasUbicacion } from '@prisma/client'

import { FaEdit, FaEraser } from 'react-icons/fa'

import { deleteMapaById } from '@/actions'
import { LoaderButton } from '@/components'

interface Props {
  mapas: MapasUbicacion[]
}

export const ProjectMapasForm = ({ mapas }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDeleteMapa = async (id: number) => {
    setIsLoading(true)
    const mapa = await deleteMapaById(id)
    setIsLoading(false)
    alert(`Mapa ${mapa.title} eliminado con éxito`)
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
          {mapas.map((mapa) => {
            return (
              <tr key={mapa.id} className='row-tabla-sinchi h-28'>
                <td className='table-td-sinchi'>{mapa.title}</td>
                <td className='table-td-sinchi'>{mapa.subTitle}</td>
                <td className='table-td-sinchi'>{mapa.order}</td>
                <td className='table-td-sinchi w-40 h-40'>
                  <Image
                    src={mapa.url ?? '/images/placeholder-img.jpeg'}
                    alt={'Imagen destacada proyecto'}
                    width={250}
                    height={250}
                  />
                </td>
                <td className='table-td-sinchi text-center'>
                  <Link href={`/admin/mapa/${mapa.id}`} className='btn-primary'>
                    Editar
                  </Link>
                </td>
                <td className='table-td-sinchi text-center'>
                  <button
                    className='btn-danger'
                    onClick={() => onDeleteMapa(mapa.id)}
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
