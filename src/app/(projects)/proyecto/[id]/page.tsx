import { projectObjetivo, projectProductos } from '@/projects/helpers/dataSeed'
import styles from './../../../../Defaults.module.css'
import {
  AuthorsGrid,
  ConveniosGrid,
  LineasGrid,
  ProgramasGrid,
  ProjectBanner,
  ProjectStateWidget,
  ProyectosProductHtml,
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
      <ProjectBanner
        urlBackground={proyecto.urlImage}
        year={proyecto.year}
        sellos={proyecto.sellos}
        completed={proyecto.completed}
        name={proyecto.name}
        tags={proyecto.tags}
        linea={proyecto.linea}
        programa={proyecto.programa}
      />
      <div
        className={`${styles.xBannerPaddings} sticky top-0 sm:h-fit h-dvh  flex flex-col flex-wrap items-start bg-accent-100 w-full py-6 gap-2`}
      >
        <div className='flex flex-col justify-start items-start gap-2 w-full'>
          {/* YEAR & sellos start*/}

          {/* TITLE */}
          <h2 className={styles.titleBannerFullWidth}>
            {proyecto.id} | {proyecto.name}
          </h2>
        </div>

        {/* Linea y programa */}
 
        <ConveniosGrid convenios={proyecto.convenios} />
        {/* palabras clave y regiones */}
        <div className='flex lg:flex-row lg:justify-between flex-col justify-start  w-full p-2 mt-2'>
          <TagsGrid tags={proyecto.tags} />
          <RegionsGrid regions={proyecto.regions} />
        </div>

        {/* autores */}
        {proyecto.autor && <AuthorsGrid author={proyecto.autor} />}

        {/* completed row  start*/}
        <div className='flex flex-row justify-between w-full'>
          <SellosGrid sellos={proyecto.sellos} selloSize={70} />
          <ProjectStateWidget completed={proyecto.completed} />
        </div>
        {/* completed row  end*/}
        {/* TODO: Convenio */}
      </div>
      {/* banner end */}

      {/* OBJETIVO START*/}
      <div
        className={`${styles.xBannerPaddings} sticky top-0 h-screen flex flex-col items-center justify-center bg-primary-300  gap-8 w-full`}
      >
        <div className='flex flex-col justify-center items-center  p-4 gap-4'>
          <h2 className='text-4xl font-bold text-bg-200 mb-2 text-center'>
            Objetivo
          </h2>
          {/* <p>{proyecto.objetivo}</p> */}
          {proyecto.objetivo && (
            <div
              dangerouslySetInnerHTML={{ __html: proyecto.objetivo }}
              className='text-bg-100 p-2'
            />
          )}
        </div>
      </div>
      {/* OBJETIVO END*/}

      {/* PRODUCTOS START*/}
      <div
        className={`${styles.xBannerPaddings} sticky top-0 h-screen flex flex-col items-center justify-center bg-primary-200  gap-8 w-full`}
      >
        <div className='flex flex-col justify-center items-center w-full p-4 gap-4 '>
          <h2 className='text-4xl font-bold text-bg-200 mb-2 text-center'>
            Producto esperados
          </h2>
          <ProyectosProductHtml htmlContent={proyecto.products ?? ''} />
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
