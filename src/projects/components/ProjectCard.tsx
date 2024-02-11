import Link from 'next/link'
import {
  AuthorsGrid,
  ConveniosGrid,
  ProgramasGrid,
  ProjectStateWidget,
  RegionsGrid,
  SellosGrid,
  TagsGrid,
} from '..'
import { projectObjetivo } from '../helpers/dataSeed'

import styles from '../../Defaults.module.css'
import { Proyecto, Sello } from '@prisma/client'

interface Props {
  proyecto: {
    sellos: Sello[]
  } & Proyecto
}

export const ProjectCard = ({ proyecto }: Props) => {
  const {
    name,
    urlImage = '/images/background-fallback.webp',
    objetivo,
    id,
    year,
  } = proyecto

  const finalUrlImage = urlImage || '/images/background-fallback.webp'

  return (
    <>
      <Link
        href={`/proyecto/${id}`}
        title={name}
        className={`group relative  w-72 lg:w-[500px] sm:h-64 h-80 sm:max-w-[600px] overflow-hidden rounded-sm shadow-md bg-primary-100 hover:shadow-xl transition-shadow duration-300 ease-in-out p-2 cursor-pointer bg-cover bg-center hover:bg-blend-multiply bg-blend-normal`}
        style={{ backgroundImage: `url(${finalUrlImage})` }}
      >
        {/* Acá contenido que se ve sin hover */}
        <div className='flex flex-col  h-full justify-between'>
          <div className='flex flex-col justify-start '>
            <div className='flex flex-row justify-between items-start w-full'>
              {/* year  start*/}
              <h2 className='text-left text-xl font-extrabold text-bg-100 leading-none'>
                {year}
              </h2>
              {/* year ends*/}
              {/* sellos row row  start*/}
              <div className='flex flex-row flex-nowrap justify-end gap-2 w-full'>
                <SellosGrid sellos={proyecto.sellos} />
                <ProjectStateWidget completed={proyecto.completed} />
              </div>
              {/* sellos row end*/}
            </div>
          </div>
        </div>
        {/* Acá termina contenido que se ve sin hover */}

        {/* Acá va el bloque que sube al hover */}
        <div className='bg-bg-100 bg-opacity-95  hidden sm:flex sm:flex-col sm:justify-between bottom-0 inset-x-0 h-full mt-auto px-4 py-2 translate-y-36 transition duration-300 ease-in-out group-hover:translate-y-0 sm:absolute group-hover:bg-opacity-70'>
          {/* <TagsGrid idProject={id} /> */}

          {/* Objetivo */}
          <div className='flex flex-col justify-start items-start'>
            {/* TITLE */}
            <h2 className={`text-base font-semibold text-text-100 mt-1 mb-2`}>
              {name}
            </h2>

            {/* objetivo starts */}
            <h3 className='text-sm text-accent-100 font-semibold mb-1'>
              Objetivo
            </h3>
            {objetivo && (
              <div
                className={`w-full text-xs leading-relaxed mb-8 text-text-200 h-16  truncate`}
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
