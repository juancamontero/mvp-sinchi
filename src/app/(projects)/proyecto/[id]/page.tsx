import type { Metadata } from 'next'

import { getProyectoById } from '@/actions'
import {
  ConveniosGrid,
  IndicadoresSlider,
  MapasSlider,
  MultimediaCarousel,
  ProjectBanner,
  ProjectColumnsHtml,
  ProjectLongHtml,
  ProjectPageSection,
  TermsGrid,
  createSellosArray,
} from '@/projects'
import { FaChevronDown } from 'react-icons/fa'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  const proyecto = await getProyectoById(Number(id))
  if (!proyecto) return { title: 'No encontrado' }
  return { title: `${id}|${proyecto.name}` }
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
    <main
      className={`flex-1 w-full relative overflow-y-auto scroll-smooth lg:snap-y z-50`}
    >
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
        <div id='antecedentes' className='projectColumnSection'>
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
        <div id='description' className='projectColumnSection text-bg-100'>
          <h2 className='text-4xl font-bold mb-1 text-left w-full'>
            Descripción
          </h2>

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
        <div
          id='regiones'
          className='projectColumnSection py-8  text-accent-50'
        >
          <h2 className='text-4xl font-bold text-left w-full lg:mt-8'>
            Localización geográfica
          </h2>
          {/* DEPARTAMENTOS + PLACES + MAPA */}
          <div className='flex flex-col justify-start items-stretch gap-4 lg:flex-row w-full'>
            {/* departamentos + places */}
            <div className='text-bg-100 lg:w-1/5 pt-4 w-full lg:pt-8'>
              {/* Departamentos */}
              {/* <h3 className='text-2xl font-bold text-left w-full'>
                {proyecto.regions.length > 1 ? 'Departamentos' : 'Departamento'}
              </h3> */}
              <TermsGrid
                items={proyecto.regions}
                className='mr-2 leading-tight text-2xl font-bold'
              />
              {/* Places */}
              <hr className='w-3/4 lg:w-full mt-3 mb-1' />
              <p className='text-bg-100 text-sm  w-full font-light '>
                {proyecto.places}
              </p>
            </div>

            {/* Map */}
            <div className=' flex flex-col justify-start items-center my-auto w-full  lg:w-4/5 '>
              <MapasSlider mapas={proyecto.mapasUbicacion ?? []} />
            </div>
          </div>
        </div>
      </ProjectPageSection>

      {/* JUSTIFICACIÓN */}
      <ProjectPageSection
        className='bg-bg-400'
        arrowRef='#objetivo'
        linkStyle='text-primary-300'
      >
        <div
          id='justification'
          className='projectColumnSection text-primary-300  lg:max-h-[90vh]'
        >
          <h2 className='text-4xl font-extrabold text-left w-full mb-2'>
            Justificación
          </h2>

          <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-6 overflow-y-auto w-full'>
            {/* importancia */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-3xl font-semibold'>Importancia</h3>
              {proyecto.importancia && (
                <ProjectLongHtml
                  html={proyecto.importancia}
                  scrollBarColor='#EFEDE8'
                />
              )}
            </div>

            {/* pertinencia */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-3xl font-semibold'>Pertinencia</h3>
              {proyecto.pertinencia && (
                <ProjectLongHtml
                  html={proyecto.pertinencia}
                  scrollBarColor='#EFEDE8'
                />
              )}
            </div>

            {/* impacto */}
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <h3 className='text-3xl font-semibold'>Impacto</h3>
              {proyecto.impacto && (
                <ProjectLongHtml
                  html={proyecto.pertinencia}
                  scrollBarColor='#EFEDE8'
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
        <div id='objetivo' className='projectColumnSection text-bg-100'>
          <h2 className='text-4xl font-extrabold text-left lg:w-5/6 w-full mb-2'>
            Objetivo general
          </h2>
          {proyecto.objetivo && (
            <div
              dangerouslySetInnerHTML={{ __html: proyecto.objetivo }}
              className='text-base text-left leading-snug lg:w-5/6 w-full long-html  overflow-y-auto lg:max-h-80'
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarColor: `#EB9B78 rgba(255, 255, 255, 0)`,
                scrollbarWidth: 'auto',
                columnFill: 'balance',
                /* Add media query for mobile screens */
              }}
            />
          )}

          <div className='flex flex-col justify-start items-center overflow-y-auto w-full mt-8'>
            <h2 className='text-4xl font-extrabold text-left mb-4 w-full'>Alcance</h2>

            <ProjectColumnsHtml
              html={proyecto.products}
              scrollBarColor='#EB9B78'
            />
          </div>
        </div>
      </ProjectPageSection>

      {/* ACTORES + BENEFICIARIOS + IMAGEN INDICADOR  + FOTOS TITLE*/}
      <ProjectPageSection className='bg-bg-300' fullLgHeight={false}>
        <div id='actores' className='projectColumnSection text-primary-200'>
          {/* ACTORES + BENEFICIARIOS + IMAGEN INDICADOR */}
          <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-4  w-full lg:h-[50vh] h-fit pt-12'>
            {/* Actores */}
            <div className='flex flex-col justify-start items-stretch gap-4 lg:max-h-[45vh]'>
              <h3 className='text-4xl font-semibold'>Actores</h3>
              {proyecto.actores && (
                <ProjectLongHtml
                  html={proyecto.actores}
                  scrollBarColor='#E9E8E4'
                />
              )}
            </div>

            {/* Beneficiarios */}
            <div className='flex flex-col justify-start items-stretch gap-4 lg:max-h-[45vh]  '>
              <h3 className='text-4xl font-semibold'>Beneficiarios</h3>
              {proyecto.beneficiarios && (
                <ProjectLongHtml
                  html={proyecto.beneficiarios}
                  scrollBarColor='#E9E8E4'
                />
              )}
            </div>
            {/* Imagen indicadores */}
            <div className='flex flex-col justify-start items-stretch lg:max-h-[45vh] h-auto'>
              <IndicadoresSlider indicadores={proyecto.imagenesIndicadores} />
            </div>
          </div>
        </div>
      </ProjectPageSection>

      {/* INICIA MULTIMEDIA */}
      <ProjectPageSection
        fullLgHeight={false}
        enablePaddings={false}
        className='bg-bg-150'
      >
        <div className=' xBannerPaddings flex flex-col justify-start items-center  text-primary-200 w-full h-fit mt-4'>
          <h3 className='text-4xl font-semibold mt-2 mb-10 text-left w-full'>
            Fotografías y videos
          </h3>
        </div>

        <MultimediaCarousel multimedias={proyecto.multimedias} />

        {/* FILA CON FLECHA ⬇️  */}
        <div className='flex h-24 flex-col justify-center items-center bg-bg-150 w-full'>
          <span
            className={`text-left opacity-50 saturate-200 hover:opacity-100  text-primary-200`}
          >
            <FaChevronDown size={20} />
          </span>
        </div>
      </ProjectPageSection>

      {/* ACTORES + BENEFICIARIOS + DEPARTAMENTOS + PALABRAS CLAVE  */}
      <div
        className={`lg:sticky lg:top-0  h-fit flex flex-col items-start justify-start  gap-1 w-full  bg-bg-150`}
      >
        {/* DEPARTAMENTOS + PALABRAS CLAVE   */}
        <div className='flex flex-col justify-start items-center p-0 bg-bg-150 text-primary-200 w-full h-fit'>
          <div className='xBannerPaddings w-full py-4'>
            <h3 className='text-2xl font-semibold w-full'>
              Busca otros proyectos en la misma zona o de temas similares
            </h3>
          </div>
        </div>

        {/* DEPARTAMENTOS   */}
        <div className='flex flex-col justify-start items-center  py-4 bg-bg-300 text-primary-200 w-full h-fit'>
          <div className='xBannerPaddings w-full flex flex-col sm:flex-row gap-1 justify-start items-stretch'>
            <h3 className='text-xl font-semibold mr-8 leading-none'>
              Departamento(s)
            </h3>
            <TermsGrid
              items={proyecto.regions}
              urlBase='/region'
              className='mr-2 leading-none pt-1 text-base'
            />
          </div>
        </div>

        {/* PALABRAS CLAVE   */}
        <div className='flex flex-col justify-start items-center  py-4 bg-bg-150 text-primary-200 w-full h-fit'>
          <div className='xBannerPaddings w-full flex flex-col sm:flex-row gap-1 justify-start items-stretch'>
            <h3 className='text-xl font-semibold mr-8 leading-none'>
              Palabras clave
            </h3>
            <TermsGrid
              items={proyecto.tags}
              urlBase='/palabra-clave'
              className='mr-2 leading-none text-base pt-1'
            />
          </div>
        </div>
      </div>
    </main>
  )
}
