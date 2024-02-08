import { projectObjetivo, projectProductos } from '@/projects/helpers/dataSeed'
import styles from './../../../../Defaults.module.css'
import {
  AuthorsGrid,
  ConveniosGrid,
  LineasGrid,
  ProgramasGrid,
  ProjectStateWidget,
  RegionsGrid,
  SellosGrid,
  TagsGrid,
  getProyectoById,
} from '@/projects'
import Link from 'next/link'

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
    <main className={`${styles.pageDefault} relative`}>
      {/* banner start */}
      <div
        className={`${styles.xBannerPaddings} sticky top-0 sm:h-fit h-dvh  flex flex-col flex-wrap items-start bg-accent-100 w-full py-6 gap-2`}
      >
        <div className='flex flex-col justify-start items-start gap-2 w-full'>
          
          {/* YEAR & sellos start*/}
          <div className='flex flex-row flex-wrap sm:gap-0 gap-2 sm:flex-nowrap justify-between w-full'>
            <h3 className='text-left text-2xl sm:text-4xl leading-none font-extrabold text-text-200'>
              2022
            </h3>
          
          </div>
          {/* YEAR & sellos end*/}

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
        <SellosGrid idProject={id} selloSize={70} />
          <ProjectStateWidget completed={true} />
        </div>
        {/* completed row  end*/}
        {/* TODO: Convenio */}
      </div>
      {/* banner end */}

      {/* OBJETIVO START*/}
      <div
        className={`${styles.xBannerPaddings} sticky top-0 h-screen flex flex-col items-center justify-center bg-primary-300  gap-8`}
      >
        <div className='flex flex-col justify-center items-center w-full p-4 gap-4'>
          <h2 className='text-4xl font-bold text-bg-200 mb-2 text-center'>
            Objetivo
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: projectObjetivo }}
            className='text-bg-100 p-2'
          />
        </div>
      </div>
      {/* OBJETIVO END*/}

      {/* PRODUCTOS START*/}
      <div
        className={`${styles.xBannerPaddings} sticky top-0 h-screen flex flex-col items-center justify-center bg-primary-200  gap-8`}
      >
        <div className='flex flex-col justify-center items-center w-full p-4 gap-4 '>
          <h2 className='text-4xl font-bold text-bg-200 mb-2 text-center'>
            Producto esperados
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: projectProductos }}
            className='text-bg-100 overflow-x-auto h-[450px]'
          />
        </div>
      </div>
      {/* PRODUCTOS END*/}

      {/* GENIALLY STARTS */}

      <div className='sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white w-full'>
        <h2 className='text-4xl'>Genialy</h2>

        <div className='w-full p-20'>
          <iframe
            title='LISTA ÁTOMO'
            className='w-11/12 h-fit mx-auto'
            src='https://view.genial.ly/65be698af4f55500145640ce'
          />
        </div>

        <p>Scroll Down</p>
      </div>

      {/* GENIALLY ENDS */}

      {/* </div> */}
    </main>
  )
}
