import { projectObjetivo, projectProductos } from '@/projects/helpers/dataSeed'
import styles from './../../../../Defaults.module.css'
import {
  AuthorsGrid,
  ConveniosGrid,
  LineasGrid,
  ProgramasGrid,
  ProjectStateWidget,
  RegionsGrid,
  TagsGrid,
  getProyectoById,
} from '@/projects'

interface Props {
  params: {
    id: number
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = params
  const proyecto = await getProyectoById(Number(id))
  if (!proyecto) return <>No encontrado</>

  return (
    <main className={styles.pageDefault}>
      <div
        className={`${styles.xBannerPaddings}  flex flex-col flex-wrap items-start bg-accent-100 w-full py-6 gap-2`}
      >
        <div className='flex flex-col justify-start items-start gap-2'>
          {/* YEAR */}
          <h3 className='text-left text-4xl leading-none font-extrabold text-text-200'>
            2022
          </h3>
          <h2 className={styles.titleBannerFullWidth}>
            <span className='text-accent-200'>PROYECTO</span>
          </h2>
          {/* TITLE */}
          <h2 className={styles.titleBannerFullWidth}>{proyecto.name}</h2>
        </div>

        {/* Linea y programa */}
        <div className='flex lg:flex-row lg:justify-between flex-col justify-start  w-full mt-2 gap-2'>
          <LineasGrid idProject={id} />
          <ProgramasGrid idProject={id} />
        </div>
        <ConveniosGrid idProject={id} />
        {/* palabras clave y regiones */}
        <div className='flex lg:flex-row lg:justify-between flex-col justify-start  w-full p-2 mt-2'>
          <TagsGrid idProject={id} />
          <RegionsGrid idProject={id} />
        </div>

        {/* autores */}
        <AuthorsGrid idProject={id} />

        {/* completed row  start*/}
        <div className='flex flex-row justify-between w-full'>
          <ProjectStateWidget completed={true} />
        </div>
        {/* completed row  end*/}
        {/* TODO: Convenio */}
      </div>

      {/* Description */}
      {/* <p className='text-sm leading-relaxed mb-8'>{description}</p> */}

      <div className='relative w-full'>
        <div className='sticky top-0 h-screen flex flex-col sm:flex-row items-stretch justify-center bg-primary-300 p-8 gap-8  z-50'>

          <div className='flex flex-col justify-start items-stretch sm:w-1/2 w-full p-4 gap-4 bg-bg-200 bg-opacity-5 rounded-sm'>
            <h2 className='text-4xl font-bold text-bg-200'>Objetivo</h2>
            <div dangerouslySetInnerHTML={{__html: projectObjetivo}} className='text-bg-100'/>
          </div>

          <div className='flex flex-col justify-start items-stretch sm:w-1/2 w-full p-4 gap-4 bg-bg-200 bg-opacity-5 rounded-sm'>
            <h2 className='text-4xl font-bold text-bg-200'>Producto esperados</h2>
            <div dangerouslySetInnerHTML={{__html: projectProductos}} className='text-bg-100'/>
          </div>
        </div>

        <div className='sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white'>
          <h2 className='text-4xl'>The Second Title</h2>
          <p>Scroll Down</p>
        </div>
        <div className='sticky top-0 h-screen flex flex-col items-center justify-center bg-purple-600 text-white'>
          <h2 className='text-4xl'>The Third Title</h2>
          <p>Scroll Down</p>
        </div>
        <div className='sticky top-0 h-screen flex flex-col items-center justify-center bg-neutral-800 text-white'>
          <h2 className='text-4xl'>The Fourth Title</h2>
        </div>
      </div>
    </main>
  )
}
