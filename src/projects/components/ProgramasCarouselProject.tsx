import { Programa } from '@prisma/client'
import styles from '../../Defaults.module.css'
import Link from 'next/link'
import { IconLinea, ProjectsCarousel, getProyectosByProgramaId } from '..'
interface Props {
  programa: Programa
}

export const ProgramasCarouselProject = async ({ programa }: Props) => {
  const { id, name, urlIcon } = programa
  const proyectos = await getProyectosByProgramaId(id) || []

  return (
    <>
      <div
        className={`mt-4 w-full flex flex-col justify-start  items-start bg-bg-200 py-8 ${styles.xBannerPaddings}`}
      >
        {/* Headers start */}
        <div className='w-full  p-2'>
          <IconLinea urlIcon={urlIcon} name={name} size={52} />

          <h2 className='text-xl font-semibold text-text-100 text-left mt-1 text-wrap'>
            {name}
          </h2>
          <Link
            className={styles.buttonLink}
            href={`/programa/${id}`}
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
