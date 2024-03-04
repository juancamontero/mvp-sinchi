'use client'

import { deleteImage } from '@/actions'
import { Imagen } from '@prisma/client'
import Image from 'next/image'
import { UploadImage } from './UploadImage'
import { useState } from 'react'
import { LoaderButton } from '@/components'

interface Props {
  images: Imagen[]
}

export const ImagesFormGrid = ({ images }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleDelete = async (id: number, url: string) => {
    setIsLoading(true)
    const confirmed = window.confirm(`Seguro quiere eliminar la imagen?`)
    if (confirmed) {
      setIsLoading(true)
      await deleteImage(id, url)
    }
    setIsLoading(false)
  }

  return (
    <div className='mt-2 w-full'>
      <UploadImage />
      <div className='grid grid-cols-6 gap-1 mt-4 w-full'>
        {images.map((image) => (
          <div
            key={image.id}
            className={`p-2 border  rounded-sm transition-all text-center bg-bg-200 flex flex-col`}
          >
            <div
              className='text-xs font-semibold hover:text-primary-300 h-full w-full px-2'
              title='Editar palabra clave'
            >
              <Image
                src={image.url}
                alt='imagen plataforma'
                width={400}
                height={400}
                className='object-scale-down object-center w-full h-full'
              />
            </div>
            <button
              className='btn-delete text-xs p-1'
              onClick={() => handleDelete(image.id, image.url)}
            >
              {isLoading ? <LoaderButton /> : 'Eliminar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
