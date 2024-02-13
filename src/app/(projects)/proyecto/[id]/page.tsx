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
        convenios={proyecto.convenios}
        regiones={proyecto.regions}
        places={proyecto.places ?? ''}
        autor={proyecto.autor}
      />


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
