import type { Metadata } from 'next'

import { getProyectoById } from '@/actions'
import {
  ConveniosGrid,
  IndicadoresSlider,
  MapasSlider,
  MultimediaCarousel,
  ProjectBanner,
  ProjectColumnsHtml,
  ProjectPageSection,
  TermsGrid,
  createSellosArray,
} from '@/projects'
import { FaChevronDown } from 'react-icons/fa'

import { multimedias } from './multimedia-dummy'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  const proyecto = await getProyectoById(Number(id))
  if (!proyecto) return { title: 'No encontrado' }
  return { title: proyecto.name }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = params
  const proyecto = await getProyectoById(Number(id))

  if (!proyecto) return <>No encontrado</>

  const sellosArray = createSellosArray({
    linea: proyecto.linea,
    programa: proyecto.programa,
    sellos: proyecto.sellos,
  })

  return (
    <main className={`flex-1 w-full relative overflow-y-auto scroll-smooth snap-y z-40`}>
      {/* <main className={`projectPage relative h-full`}> */}
      {/* banner start */}
      <ProjectBanner
        customImage={proyecto.imagen?.url}
        year={proyecto.year}
        name={proyecto.name}
        autor={proyecto.autor}
        roleInvestigador={proyecto.roleInvestigador}
        equipo={proyecto.equipo}
        sellosArray={sellosArray}
      />

      {/* ANTECEDENTES START*/}
      <ProjectPageSection 
        className='bg-bg-200'
        arrowRef='#description'
        linkStyle='text-primary-100'
      >
        <div id='antecedentes'  className='flex flex-col justify-start items-center  p-4 gap-4 w-full'>
          <h2 className='text-4xl font-bold text-primary-200 mb-2 text-left w-full'>
            Antecedentes
          </h2>
          {/* <p>{proyecto.objetivo}</p> */}
          <ProjectColumnsHtml
            html={proyecto.antecedentes}
            scrollBarColor='#DFDED9'
          />
        </div>
      </ProjectPageSection>

      {/* descripcion & Aliados START*/}
      <ProjectPageSection 
      className='bg-text-100'
      arrowRef='#regiones'
      linkStyle='text-bg-100'
      >
        <div
          id='description'
          className='flex flex-col justify-start items-start  p-2 gap-4 w-full text-bg-100'
        >
          <h2 className='text-4xl font-bold mb-1 text-left w-full'>
            Descripción
          </h2>
          {/* <p>{proyecto.objetivo}</p> */}
          <ProjectColumnsHtml
            html={proyecto.descripcion}
            scrollBarColor='#0A3030'
          />

          <h2 className='text-4xl font-bold mb-2 text-left w-full mt-4'>
            Aliados
          </h2>
          <ConveniosGrid convenios={proyecto.convenios} />
        </div>
      </ProjectPageSection>

      {/* LOCALIZACIÓN GEOGRÁFICA START*/}
      <ProjectPageSection 
      className='bg-text-200'
      arrowRef='#justification'
      linkStyle='text-accent-50'
      >
        <div id='regiones' className='flex flex-col justify-start items-start  py-8 gap-2 w-full text-accent-50'>
          <h2 className='text-4xl font-bold text-left w-full lg:mt-8'>
            Localización geográfica
          </h2>
          {/* Places */}
          <p className='text-bg-100 lg:w-1/2  w-full'>{proyecto.places}</p>
          {/* Map */}
          <div className='flex-1  flex flex-col justify-start items-center my-auto w-full'>
            <MapasSlider mapas={proyecto.mapasUbicacion ?? []} />
          </div>
        </div>
      </ProjectPageSection>

      {/* JUSTIFICACIÓN */}
      <ProjectPageSection 
      className='bg-bg-400'
      arrowRef='#objetivo'
      linkStyle='text-primary-300'
      >
        <div id='justification' className='flex flex-col justify-center items-start  p-4 gap-4 w-full text-primary-300'>
          <h2 className='text-4xl font-extrabold text-left w-full mb-2'>
            Justificación
          </h2>

          <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-6 overflow-y-auto w-full lg:max-h-[80vh]'>
            {/* importancia */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-3xl font-semibold'>Importancia</h3>
              {proyecto.importancia && (
                <div
                  dangerouslySetInnerHTML={{ __html: proyecto.importancia }}
                  className='text-base text-left text-text-200 leading-snug'
                />
              )}
            </div>

            {/* pertinencia */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-3xl font-semibold'>Pertinencia</h3>
              {proyecto.pertinencia && (
                <div
                  dangerouslySetInnerHTML={{ __html: proyecto.pertinencia }}
                  className='text-base text-left text-text-200 leading-snug'
                />
              )}
            </div>

            {/* impacto */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-3xl font-semibold'>Impacto</h3>
              {proyecto.impacto && (
                <div
                  dangerouslySetInnerHTML={{ __html: proyecto.impacto }}
                  className='text-base text-left text-text-200 leading-snug'
                />
              )}
            </div>
          </div>
        </div>
      </ProjectPageSection>

      {/* OBJETIVO + PRODUCTOS */}
      <ProjectPageSection 
      className='bg-accent-100'
      arrowRef='#actores'
      linkStyle='text-bg-100'
      >
        <div id='objetivo' className='flex flex-col justify-center items-center  p-4 gap-4 w-full text-bg-100'>
          <h2 className='text-4xl font-extrabold text-center w-full mb-2'>
            Objetivo general
          </h2>
          {proyecto.objetivo && (
            <div
              dangerouslySetInnerHTML={{ __html: proyecto.objetivo }}
              className='text-base text-center leading-snug lg:w-1/3 w-full'
              style={{}}
            />
          )}

          <div className='flex flex-col justify-start items-center overflow-y-auto w-full mt-8'>
            <h3 className='text-3xl font-semibold mb-4'>Alcance</h3>

            <ProjectColumnsHtml
              html={proyecto.products}
              scrollBarColor='#EB9B78'
            />
          </div>
        </div>
      </ProjectPageSection>

      {/* ACTORES + BENEFICIARIOS + DEPARTAMENTOS + PALABRAS CLAVE  */}
      <div
      
        className={`sticky top-0  h-fit flex flex-col items-start justify-start  gap-1 w-full  bg-bg-150`}
      >
        {/* ACTORES + BENEFICIARIOS + IMAGEN INDICADOR  + FOTOS TITLE*/}
        <div id='actores' className='flex flex-col justify-start p-0 bg-bg-300 text-primary-200 w-full'>
          {/* ACTORES + BENEFICIARIOS + IMAGEN INDICADOR */}
          <div className='xBannerPaddings grid lg:grid-cols-3 sm:grid-cols-1 gap-2 overflow-y-auto w-full lg:h-[50vh]  pt-12'>
            {/* Actores */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-4xl font-semibold'>Actores</h3>
              {proyecto.actores && (
                <div
                  dangerouslySetInnerHTML={{ __html: proyecto.actores }}
                  className='text-base text-left text-text-200 leading-snug sinchi-list'
                />
              )}
            </div>

            {/* Beneficiarios */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-4xl font-semibold'>Beneficiarios</h3>
              {proyecto.beneficiarios && (
                <div
                  dangerouslySetInnerHTML={{ __html: proyecto.beneficiarios }}
                  className='text-base text-left text-text-200 leading-snug sinchi-list'
                />
              )}
            </div>
            {/* Imagen indicadores */}
            <div className='flex flex-col justify-start items-stretch'>
              <IndicadoresSlider indicadores={proyecto.imagenesIndicadores} />
            </div>
          </div>
          <h3 className='xBannerPaddings text-4xl font-semibold mt-2 mb-10'>
            Fotografías y videos
          </h3>
        </div>
        <MultimediaCarousel multimedias={proyecto.multimedias} />

        {/* FILA CON FLECHA ⬇️  */}
        <div className='flex h-24 flex-col justify-center items-center bg-bg-300 w-full'>
          <span
            className={`text-left opacity-50 saturate-200 hover:opacity-100  text-primary-200`}
          >
            <FaChevronDown size={20} />
          </span>
        </div>

        {/* DEPARTAMENTOS + PALABRAS CLAVE   */}
        <div className='flex flex-col justify-start items-center p-0 bg-bg-150 text-primary-200 w-full h-fit'>
          <div className='xBannerPaddings w-full py-4'>
            <h3 className='text-4xl font-semibold w-full'>
              Busca otros proyectos en la misma zona o de temas similares
            </h3>
          </div>
        </div>

        {/* DEPARTAMENTOS   */}
        <div className='flex flex-col justify-start items-center  py-4 bg-bg-300 text-primary-200 w-full h-fit'>
          <div className='xBannerPaddings w-full flex flex-row justify-start items-stretch'>
            <h3 className='text-4xl font-semibold mr-8 leading-none'>
              Departamento
            </h3>
            <TermsGrid items={proyecto.regions} urlBase='/region' />
          </div>
        </div>

        {/* PALABRAS CLAVE   */}
        <div className='flex flex-col justify-start items-center  py-4 bg-bg-150 text-primary-200 w-full h-fit'>
          <div className='xBannerPaddings w-full flex flex-row justify-start items-stretch'>
            <h3 className='text-4xl font-semibold mr-8 leading-none'>
              Palabras clave
            </h3>
            <TermsGrid items={proyecto.tags} urlBase='/palabra-clave' />
          </div>
        </div>
      </div>
    </main>
  )
}
