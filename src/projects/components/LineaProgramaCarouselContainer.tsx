import Link from 'next/link'
import { IconLinea, ProjectsCarousel } from '..'
import styles from '../../Defaults.module.css'
import { Sello, Proyecto } from '@prisma/client'

interface Props {
  urlIcon: string | null
  iconSize?: number
  name: string
  baseUrl: string
  proyectos: ({
    sellos: Sello[]
  } & Proyecto)[]
}

export const LineaProgramaCarouselContainer = ({
  urlIcon,
  iconSize = 52,
  name,
  baseUrl,
  proyectos
}: Props) => {
  return (
    <>
      <div
        className={`w-full flex flex-col justify-start  items-start bg-bg-200 py-2 lg:py-4 ${styles.xBannerPaddings}`}
      >
        {/* Headers start */}
        <div className='w-full  p-2'>
          {urlIcon && <IconLinea urlIcon={urlIcon} name={name} size={iconSize} />}

          <h2 className='text-xl font-semibold text-text-100 text-left mt-1 text-wrap'>
            {name}
          </h2>
          <Link
            className={styles.buttonLink}
            href={baseUrl}
            //  onClick={onToggle}
          >
            Conocer más
          </Link>
        </div>
        {/* Headers End */}

        {/* Acá viene carousel de proyectos */}
      </div>
      <ProjectsCarousel proyectos={proyectos} />
    </>
  )
}
