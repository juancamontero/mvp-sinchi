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

interface Props {
  id: number
  name: string
  idLinea: number
}

export const ProjectCard = ({ id, name, idLinea }: Props) => {
  const objetivo = projectObjetivo

  return (
    <>
      <Link
        href={`/proyecto/${id}`}
        title={name}
        className='group relative  w-72 lg:w-[600px] sm:h-64 h-80 sm:max-w-[600px] overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out p-2 cursor-pointer'
      >
        {/* Acá contenido que se ve sin hover */}
        <div className='flex flex-col  h-full justify-between'>


          <div className='flex flex-col justify-start '>

          {/* year sn completed row  start*/}
          <h2 className='text-left text-xl font-extrabold text-text-200 leading-none'>
            2022
          </h2>
          {/* year and completed row  start*/}

          {/* TITLE */}
          <h2 className=' text-sm font-semibold text-text-100 mt-1 mb-2'>
            {name}
          </h2>
          </div>


          {/* sellos row row  start*/}
          <div className='flex flex-row flex-nowrap justify-between w-full'>
            <SellosGrid idProject={id} />
            <ProjectStateWidget completed={true} />
          </div>
          {/* sellos row end*/}
        </div>
        {/* Acá termina contenido que se ve sin hover */}

        {/* Acá va el bloque que sube al hover */}
        <div className='bg-primary-200 hidden sm:block bottom-0 inset-x-0 h-48 mt-auto px-8 py-6 translate-y-full transition duration-300 ease-in-out group-hover:translate-y-0 sm:absolute'>
          {/* <TagsGrid idProject={id} /> */}

          {/* Objetivo */}
          <div className='flex flex-col justify-start items-start'>
            <h3 className='text-sm text-accent-100 font-semibold mb-1'>
              Objetivo
            </h3>
            <div
              className='text-xs leading-relaxed mb-8 text-white h-36'
              dangerouslySetInnerHTML={{ __html: objetivo }}
            ></div>
          </div>
        </div>
        {/* Acá termina el bloque que sube al hover */}
      </Link>
    </>
  )
}
