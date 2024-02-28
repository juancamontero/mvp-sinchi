import Link from 'next/link'
import { IconLinea, ProjectsCarousel } from '../..'

import { Sello, Proyecto, Imagen } from '@prisma/client'
import { TbArrowBadgeRightFilled } from 'react-icons/tb'
import { TiChevronRight } from 'react-icons/ti'
import { FaChevronRight } from 'react-icons/fa'

interface Props {
  urlIcon: string | null
  iconSize?: number
  name: string
  baseUrl: string
  preTitle?: string | null
  baseColor?: string | null
  proyectos: ({
    imagen: Imagen | null
  } & Proyecto)[]
}

export const LineaProgramaCarouselContainer = ({
  urlIcon,
  iconSize = 72,
  name,
  baseUrl,
  proyectos,
  preTitle = 'Conoce más',
  baseColor,
}: Props) => {
  const colorTest = '#3076E8'

  return (
    <div className='w-full flex flex-col justify-start items-start'>
      {/* Headers start */}
      <div
        className={`w-full flex flex-row justify-start items-start  bg-bg-200 py-2 lg:py-4 gap-2 xBannerPaddings`}
      >
        <div className='sm:w-20 sm:h-20 w-12'>
          {urlIcon && (
            <IconLinea urlIcon={urlIcon} name={name} size={iconSize} />
          )}
        </div>

        {/* text column starts */}
        <div className='flex flex-col justify-start w-full'>
          <h2
            className={`font-semibold font-sans text-2xl text-left mt-1 text-wrap leading-none lg:max-w-2xl sm:max-w-xl ${
              baseColor ? '' : 'text-primary-200'
            }`}
            style={{ color: baseColor ? baseColor : undefined }}
          >
            {name}
          </h2>

          <Link
            className={`group flex flex-row flex-nowrap w-60 h-8 justify-start items-end  gap-1 saturate-150 hover:saturate-50 text-lg leading-none ${
              baseColor ? '' : 'text-primary-200'
            }`}
            style={{ color: baseColor ? baseColor : undefined }}
            href={baseUrl}

            //  onClick={onToggle}
          >
            <span className='text-left'>{preTitle}</span>
            <span className='text-left opacity-50 saturate-200 group-hover:opacity-100 p-0 h-fit'>
              <FaChevronRight size={18}/>
            </span>
          </Link>
        </div>
        {/* text column starts */}
      </div>
      
      {/* Headers End */}

      {/* Acá viene carousel de proyectos */}

      <ProjectsCarousel proyectos={proyectos}  baseColor={baseColor}/>
    </div>
  )
}
