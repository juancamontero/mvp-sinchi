import Image from 'next/image'

import {
  Autor,
  Convenio,
  Imagen,
  Linea,
  Programa,
  Region,
  Sello,
} from '@prisma/client'
import {
  SellosRow,
  ProjectStateWidget,
  TermsGrid,
  ConveniosGrid,
  RegionsGrid,
  AuthorsGrid,
  LineaProgramaGrid,
  SelloArray,
} from '../..'

interface Props {
  name: string
  urlBackground?: string | null
  year: number
  sellos: (Sello & { imagen?: Imagen | null })[]
  completed: boolean
  tags: {
    id: number
    name: string
  }[]
  linea: (Linea & { imagen?: Imagen | null }) | null
  programa: (Programa & { imagen?: Imagen | null }) | null
  convenios: Convenio[]
  regiones: Region[]
  places: string
  autor: Autor | null
  roleInvestigador?: string | null
  equipo?: string | null
  sellosArray: SelloArray[]
}

export const ProjectBanner = ({
  urlBackground,
  year,
  sellos,
  completed,
  name,
  tags,
  linea,
  programa,
  convenios,
  regiones,
  places,
  autor,
  roleInvestigador,
  equipo,
  sellosArray,
}: Props) => {
  return (
    <div className={`group w-full lg:h-full h-fit lg:sticky  top-0`}>
      {/* CONTENT DIV */}
      <div
        className={`relative xBannerPaddings py-2 sm:py-8 lg:h-full h-fit  flex flex-col justify-between bg-primary-300 `}
      >
        {/* Content full column  */}
        {/* upper section starts*/}
        <div className='flex flex-col justify-start items-center gap-0'>
          {/* ROUNDED IMAGE */}
          <Image
            className='sm:w-36 sm:h-36 w-28 h-28 object-cover object-center rounded-full'
            src={urlBackground ?? '/images/placeholder-img.jpeg'}
            width={500}
            height={500}
            alt='hero background image'
          />
          {/* Title */}
          <h2
            className={` text-bg-100 lg:text-[1.8rem] sm:text-2xl text-xl font-semibold lg:w-5/6 w-full text-center lg:leading-[1.15] leading-tight mt-2`}
          >
            {name}
          </h2>
          {/* year*/}
          <h2 className='text-center text-2xl  font-normal text-bg-200 leading-none mt-2'>
            {year}
          </h2>
          {/*INVESTIGADOR */}
          <h3 className='text-center text-xl text-text-50 lg:leading-none leading-tight mt-2'>
            Investigador responsable:{' '}
            <span className='font-extralight'>{autor?.name}</span>
          </h3>
          {/* ROLE INVESTIGADOR */}
          {roleInvestigador && (
            <h3 className='text-center text-xl text-text-50 mt-0'>
              {roleInvestigador}
            </h3>
          )}
          {/*MAIL INVESTIGADOR */}
          <p className='text-center text-base text-bg-100  lg:leading-none leading-tight mt-0 font-light'>
            {autor?.email}
          </p>
          {/* EQUIPO */}
          {equipo && (
            <h4 className='text-center text-base text-bg-100  lg:leading-none leading-tight mt-1 font-light'>
              <span className='font-medium'>Equipo técnico SINCHI: </span>
              {equipo}
            </h4>
          )}

          <div className='flex flex-row justify-between flex-wrap sm:flex-nowrap items-center w-full'>
            {/* year ends*/}
          </div>
        </div>
        {/* upper section ends*/}

        {/* bottom section starts */}
        <div className='flex flex-col w-full lg:mt-0 mt-8 '>
          {/* Sellos row */}
          <SellosRow sellos={sellosArray} />
        </div>
        {/* botton section ends */}
      </div>
    </div>
  )
}
