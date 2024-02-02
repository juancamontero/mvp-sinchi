import Link from 'next/link'
import {
  AuthorsGrid,
  ConveniosGrid,
  ProgramasGrid,
  ProjectStateWidget,
  RegionsGrid,
  TagsGrid,
} from '..'

interface Props {
  id: number
  name: string
  idLinea: number
}

export const ProjectCard = ({ id, name, idLinea }: Props) => {
  const description =
    'Mejorar la gobernanza y promover actividades de uso sostenible de las tierras, con el fin de reducir la deforestación y conservar la biodiversidad en las áreas del Proyecto. Para la FA2, se amplía el alcance geográfico a otros municipios de los departamentos de Caquetá, Guaviare, Meta, Putumayo, Amazonas y Guainía.'

  return (
    <>
      <Link 
      href={`/proyecto/${id}`}
      title={name}
      className='group relative w-96 h-64 max-w-96 overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out p-2 cursor-pointer'>
        {/* Acá contenido que se ve sin hover */}
        <div className='flex flex-col'>
          {/* year sn completed row  start*/}
          <div className='flex flex-row justify-between w-full'>
            <h2 className='text-left text-xl font-medium text-text-200 leading-none'>
              2022
            </h2>
            <span>aca van a ir los sellos</span>
            <ProjectStateWidget completed={true} />
          </div>
          {/* year sn completed row  start*/}

          {/* TITLE */}
          <h2 className=' text-sm font-semibold text-text-100 mt-1 mb-2'>
            {name}
          </h2>
        </div>
        {/* Acá termina contenido que se ve sin hover */}

        {/* Acá va el bloque que sube al hover */}
        <div className='bg-primary-200 absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 translate-y-full transition duration-300 ease-in-out group-hover:translate-y-0'>
          {/* <TagsGrid idProject={id} /> */}

          {/* Description */}
          <div className='flex flex-col justify-start items-start'>
            <h3 className='text-sm text-accent-100 font-semibold mb-1'>
              Descripción
            </h3>
            <p className='text-xs leading-relaxed mb-8 text-white'>
              {description}
            </p>
          </div>
        </div>
        {/* Acá termina el bloque que sube al hover */}
      </Link>
    </>
  )
}
