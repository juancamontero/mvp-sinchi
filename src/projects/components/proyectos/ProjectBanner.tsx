import Image from 'next/image'


import { Autor, Convenio, Imagen, Linea, Programa, Region, Sello } from '@prisma/client'
import {
  SellosGrid,
  ProjectStateWidget,
  TermsGrid,

  ConveniosGrid,
  RegionsGrid,
  AuthorsGrid,
  LineaProgramaGrid,
} from '../..'

interface Props {
  name: string
  urlBackground?: string | null
  year: number
  sellos:  (Sello & { imagen?: Imagen | null})[]
  completed: boolean
  tags: {
    id: number
    name: string
  }[]
  linea: ((Linea) & {imagen?: Imagen | null})| null
  programa:  ((Programa) & {imagen?: Imagen | null})| null
  convenios: Convenio[]
  regiones: Region[]
  places: string
  autor: Autor | null
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
}: Props) => {


  return (
    <div className={`group w-full sm:h-screen lg:sticky h-fit top-0`}>
      {/* backgroung image */}
      <Image
        className='absolute inset-0 w-full h-full object-cover object-center'
        src={urlBackground ?? '/images/placeholder-img.jpeg'}
        width={1900}
        height={800}
        alt='hero background image'
      />

      {/* overlay div */}
      <div className='absolute inset-0 w-full h-full bg-primary-300 bg-opacity-30 backdrop-blur-[2px] group-hover:backdrop-blur-0 group-hover:bg-opacity-70' />

      {/* CONTENT DIV */}
      <div className={`relative xBannerPaddings py-2 sm:py-4 h-full lg:h-[90vh] flex flex-col justify-between `}>

        {/* Content full column  */}
          {/* upper section starts*/}
          <div className='flex flex-col justify-start gap-2 md:gap-2 sm:mb-0 mb-2'>
            {/* year and seals starts */}
            <div className='flex flex-row justify-between flex-wrap sm:flex-nowrap items-center w-full'>
              {/* year  start*/}
              <h2 className='text-left lg:text-6xl text-5xl font-extrabold text-bg-300 leading-none'>
                {year}
              </h2>
              {/* year ends*/}

              {/* Project state start*/}
              <div className='w-full flex lg:flex-row flex-nowrap justify-start sm:justify-end gap-1 lg:w-full mt-1 lg:mt-0 '>
                <ProjectStateWidget completed={completed} selloSize={52} />
                <SellosGrid sellos={sellos} selloSize={52} />
              </div>
              {/* Project state end*/}
            </div>



            {/* Title */}
            <TermsGrid items={tags} urlBase='/palabra-clave' />
            <h2 className={`titleBannerFullWidth text-bg-100 text-ellipsis  hover:h-fit h-20 ` }>
              {name}
            </h2>
          </div>
          {/* upper section ends*/}

          {/* botton section starts */}
          <div className='flex flex-col justify-start gap-2 md:gap-2'>
            {/* Linea y programa */}
            {linea && <LineaProgramaGrid termino={linea} urlBase={'/linea'} />}
            {programa && (
              <LineaProgramaGrid
                termino={programa}
                urlBase={'/programa'}
                opacity={90}
              />
            )}
            <ConveniosGrid convenios={convenios} />
            <RegionsGrid regions={regiones} places={places} />
            <AuthorsGrid author={autor} />
          </div>
          {/* botton section ends */}

      </div>
    </div>
  )
}
