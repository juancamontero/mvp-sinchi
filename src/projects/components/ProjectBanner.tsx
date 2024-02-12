import Image from 'next/image'

import styles from '../../Defaults.module.css'
import { Sello } from '@prisma/client'
import {
  SellosGrid,
  ProjectStateWidget,
  TermsGrid,
  LineasGrid,
  ProgramasGrid,
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
  linea: { id: number; name: string ; urlIcon: string | null} | null
  programa: { id: number; name: string ; urlIcon: string | null} | null
}

export const ProjectBanner = ({
  urlBackground,
  year,
  sellos,
  completed,
  name,
  tags,
  linea,
  programa
}: Props) => {
  return (
    <div className={`group relative w-full h-screen`}>
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

      {/* Content  */}
      <div className={`relative ${styles.xBannerPaddings} py-6`}>
        <div className='flex flex-col  h-full justify-start gap-2'>
          {/* year and seals starts */}
          <div className='flex flex-col lg:flex-row justify-between items-start w-full sm:mb-4'>
            {/* year  start*/}
            <h2 className='text-left text-6xl font-extrabold text-white leading-none'>
              {year}
            </h2>
            {/* year ends*/}
            {/* sellos row row  start*/}
            <div className='flex  flex-col-reverse lg:flex-row flex-nowrap justify-end gap-2 lg:w-full mt-2 lg:mt-0 '>
              <ProjectStateWidget completed={completed} selloSize={52} />
            </div>
            {/* sellos row end*/}
          </div>
          {/* year and seals ends */}
          <SellosGrid sellos={sellos} selloSize={52} />
          {/* Title */}
          <h2
            className={`${styles.titleBannerFullWidth} text-bg-100 mt-2 mb-2`}
          >
            {name}
          </h2>
          <TermsGrid items={tags} urlBase='/palabra-clave' />

          {/* Linea y programa */}
  
            {linea && <LineasGrid linea={linea} />}
            {programa && (
              <ProgramasGrid programa={programa} />
            )}
  
        </div>
      </div>
    </div>
  )
}
