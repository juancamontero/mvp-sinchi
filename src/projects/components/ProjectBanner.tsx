import Image from 'next/image'

import styles from '../../Defaults.module.css'
import { Sello } from '@prisma/client'
import {
  SellosGrid,
  ProjectStateWidget,
  TermsGrid,
  LineasGrid,
  ProgramasGrid,
  ConveniosGrid,
  RegionsGrid,
  AuthorsGrid,
  LineaProgramaGrid,
} from '..'

interface Props {
  name: string
  urlBackground?: string | null
  year: number
  sellos: Sello[]
  completed: boolean
  tags: {
    id: number
    name: string
  }[]
  linea: { id: number; name: string; urlIcon: string | null } | null
  programa: { id: number; name: string; urlIcon: string | null } | null
  convenios: {
    id: number
    name: string
  }[]
  regiones: {
    id: number
    name: string
  }[]
  places: string
  autor: {
    id: number
    name: string
    email: string
  } | null
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
        src={urlBackground ?? '/images/background-fallback.webp'}
        width={1900}
        height={800}
        alt='hero background image'
      />

      {/* overlay div */}
      <div className='absolute inset-0 w-full h-full bg-primary-300 bg-opacity-80 backdrop-blur-[2px] group-hover:backdrop-blur-0 group-hover:bg-opacity-70' />

      {/* CONTENT DIV */}
      <div className={`relative ${styles.xBannerPaddings} py-2 sm:py-4 h-full lg:h-[90vh] flex flex-col justify-between `}>

        {/* Content full column  */}
          {/* upper section starts*/}
          <div className='flex flex-col justify-start gap-2 md:gap-4 sm:mb-0 mb-2'>
            {/* year and seals starts */}
            <div className='flex flex-row justify-between flex-wrap sm:flex-nowrap items-center w-full sm:mb-1'>
              {/* year  start*/}
              <h2 className='text-left lg:text-6xl text-5xl font-extrabold text-bg-200 leading-none'>
                {year}
              </h2>
              {/* year ends*/}

              {/* Project state start*/}
              <div className='w-full flex lg:flex-row flex-nowrap justify-start sm:justify-end gap-2 lg:w-full mt-2 lg:mt-0 '>
                <ProjectStateWidget completed={completed} selloSize={52} />
                <SellosGrid sellos={sellos} selloSize={52} />
              </div>
              {/* Project state end*/}
            </div>

            {/* Title */}
            <h2 className={`${styles.titleBannerFullWidth} text-bg-100`}>
              {name}
            </h2>
            <TermsGrid items={tags} urlBase='/palabra-clave' />
          </div>
          {/* upper section ends*/}

          {/* botton section starts */}
          <div className='flex flex-col justify-start gap-2 md:gap-3'>
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
