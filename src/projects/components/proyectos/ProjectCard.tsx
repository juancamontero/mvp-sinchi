import Link from 'next/link'

import { Imagen, Proyecto } from '@prisma/client'
import Image from 'next/image'

interface Props {
  proyecto: {
    imagen: Imagen | null
  } & Proyecto
}

export const ProjectCard = ({ proyecto }: Props) => {
  const { name, imagen, id, year } = proyecto
  const urlImage = imagen?.url ?? null

  return (
    <>
      <Link
        href={`/proyecto/${id}`}
        title={name}
        className={`group relative w-80 h-56 overflow-hidden rounded-sm shadow-md  hover:shadow-xl transition-shadow duration-300 ease-in-out p-2 cursor-pointer bg-cover bg-center`}
      >
        {/* background image */}
        <Image
          className='absolute inset-0 w-full h-full object-cover object-center'
          src={urlImage ?? '/images/placeholder-img.jpeg'}
          width={600}
          height={450}
          alt='hero background image'
        />

        {/* Overlay */}
        <div
          aria-hidden='true'
          className='absolute inset-0 w-full h-full group-hover:bg-primary-10000 group-hover:bg-opacity-40 backdrop-blur-0 group-hover:backdrop-blur-[2px]'
        />

        <div className='relative container m-auto px-1 md:px-2 lg:px-2'>
          {/* Acá contenido que se ve sin hover */}
          <div className='flex flex-col  h-full justify-start'>
            {/* year and seals starts */}
            <div className='flex flex-col lg:flex-row justify-between items-start w-full'></div>
            {/* year and seals ends */}
          </div>
          {/* Acá termina contenido que se ve sin hover */}
        </div>

        {/* Acá va el bloque que sube al hover */}
        <div className='bg-bg-100 bg-opacity-75 sm:flex sm:flex-col sm:justify-between bottom-0 inset-x-0 h-full mt-auto px-4 py-2 translate-y-28  transition duration-300 ease-in-out group-hover:translate-y-0 absolute group-hover:bg-opacity-90'>
          {/* <TagsGrid idProject={id} /> */}

          {/* Objetivo */}
          <div className='flex flex-col justify-start items-start '>
            {/* TITLE */}
            <h2
              className={`text-base leading-[1.2] text-text-100 mt-1 mb-2 h-14 line-clamp-3 group-hover:whitespace-normal group-hover:h-fit group-hover:line-clamp-none title-italic`}
              dangerouslySetInnerHTML={{__html: name}}
            />

            {/* objetivo starts */}
            <h2 className='text-left text-2xl font-black  text-text-100 leading-none'>
              {year}
            </h2>

            {/* Objetivo ends*/}
          </div>
        </div>
        {/* Acá termina el bloque que sube al hover */}
      </Link>
    </>
  )
}
