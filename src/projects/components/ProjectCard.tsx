import Link from 'next/link'
import { ProjectStateWidget, SellosGrid } from '..'

import { Proyecto, Sello } from '@prisma/client'
import Image from 'next/image'

interface Props {
  proyecto: {
    sellos: Sello[]
  } & Proyecto
}

export const ProjectCard = ({ proyecto }: Props) => {
  const { name, urlImage, objetivo, id, year } = proyecto

  return (
    <>
      <Link
        href={`/proyecto/${id}`}
        title={name}
        className={`group relative  w-72 sm:w-96 lg:w-[432px]  h-72 sm:max-w-[600px] overflow-hidden rounded-sm shadow-md  hover:shadow-xl transition-shadow duration-300 ease-in-out p-2 cursor-pointer bg-cover bg-center`}
        // style={{ backgroundImage: `url(${finalUrlImage})` }}
      >
        {/* background image */}
        <Image
          src={urlImage ?? '/images/background-fallback.webp'}
          width={600}
          height={600}
          alt='hero background image'
          className='absolute inset-0 w-full h-full object-cover object-center'
        />

        {/* Overlay */}
        <div
          aria-hidden='true'
          className='absolute inset-0 w-full h-full bg-primary-300 bg-opacity-40 backdrop-blur-0 group-hover:backdrop-blur-sm'
        />

        <div className='relative container m-auto px-1 md:px-2 lg:px-2'>
          {/* Acá contenido que se ve sin hover */}
          <div className='flex flex-col  h-full justify-start'>
            {/* year and seals starts */}
            <div className='flex flex-col lg:flex-row justify-between items-start w-full'>
              {/* year  start*/}
              <h2 className='text-left text-5xl font-black  text-bg-200 leading-none'>
                {year}
              </h2>
              {/* year ends*/}
              {/* sellos row row  start*/}
              <div className='flex  flex-col-reverse lg:flex-row flex-wrap justify-end gap-2 lg:w-1/2 mt-2 lg:mt-0 '>
                <SellosGrid sellos={proyecto.sellos} />
                <ProjectStateWidget completed={proyecto.completed} />
              </div>
              {/* sellos row end*/}
            </div>
            {/* year and seals ends */}
          </div>
          {/* Acá termina contenido que se ve sin hover */}
        </div>

        {/* Acá va el bloque que sube al hover */}
        <div className='bg-bg-100 bg-opacity-50 sm:flex sm:flex-col sm:justify-between bottom-0 inset-x-0 h-full mt-auto px-4 py-2 translate-y-56 lg:translate-y-48 transition duration-300 ease-in-out group-hover:translate-y-[80px] absolute group-hover:bg-opacity-90'>
          {/* <TagsGrid idProject={id} /> */}

          {/* Objetivo */}
          <div className='flex flex-col justify-start items-start'>
            {/* TITLE */}
            <h2
              className={`text-base font-semibold text-text-100 mt-1 mb-2 h-12 whitespace-normal truncate text-ellipsis group-hover:whitespace-normal group-hover:h-fit`}
            >
              {name}
            </h2>

            {/* objetivo starts */}
            <h3 className='text-sm text-accent-100 font-semibold mb-1'>
              Objetivo
            </h3>
            {objetivo && (
              <div
                className={`w-full text-xs leading-relaxed mb-8 text-text-100`}
                dangerouslySetInnerHTML={{ __html: objetivo }}
              />
            )}
            {/* Objetivo ends*/}
          </div>
        </div>
        {/* Acá termina el bloque que sube al hover */}
      </Link>
    </>
  )
}
