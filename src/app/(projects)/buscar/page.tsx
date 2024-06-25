import {
  getAllConvenios,
  getAllInvestigadores,
  getAllProjectsForm,
  getAllRegiones,
  getAllTags,
} from '@/actions'
import { getAllSellos } from '@/actions/sellos/sellos-actions'
import { HomeHeroBanner, MenuButtonsHorizontal } from '@/components'
import { ProjectsListSearch, TermRowStats, TermsCountBars } from '@/projects'

export function generateMetadata() {
  return {
    title: `SINCHI | Búsqueda`,
    description: `Búsqueda y listado de proyectos según criterios`,
  }
}

export default async function BuscarPage() {
  const [regiones, tags, aliados, sellos, investigadores, proyectos] =
    await Promise.all([
      getAllRegiones(),
      getAllTags(),
      getAllConvenios(),
      getAllSellos(),
      getAllInvestigadores(),
      getAllProjectsForm(),
    ])

  const regionTerms = regiones.map((term) => {
    return {
      id: term.id,
      name: term.name,
      count: term._count.Proyecto,
    }
  })
  const tagsTerms = tags.map((term) => {
    return {
      id: term.id,
      name: term.name,
      count: term._count.Proyecto,
    }
  })
  const aliadoTerms = aliados.map((term) => {
    return {
      id: term.id,
      name: term.name,
      count: term._count.Proyecto,
      imageUrl: term.imagen?.url,
    }
  })
  const sellosTerms = sellos.map((term) => {
    return {
      id: term.id,
      name: term.name,
      count: term._count.Proyecto,
      imageUrl: term.imagen?.url,
    }
  })

  const investigadorTerms = investigadores.map((term) => {
    return {
      id: term.id,
      name: term.name,
      count: term._count.Proyecto,
    }
  })

  const projectsToRender = proyectos.map((project) => {
    return {
      id: project.id,
      name: project.name,
      imageUrl: project.imagen?.url,
    }
  })

  return (
    <main className={`pageTermDefault`}>
      <HomeHeroBanner title={'Proyectos a 2024'} subTitle={'Búsqueda'}>
        {/* <MenuButtonsHorizontal
          menuItems={[
            { url: '/', text: 'Líneas de investigación' },
            { url: '/programas', text: 'Programas de investigación' },
          ]}
        /> */}
      </HomeHeroBanner>

      <div
        className={`w-full h-full  flex flex-col gap-2 justify-between items-start lg:items-stretch mt-1`}
      >
        {/* <ProjectsListSearch /> */}
        {/* <TermRowStats title='Búsqueda de proyectos por nombre'>
          <ProjectsListSearch proyectos={projectsToRender} />
        </TermRowStats> */}
        <TermRowStats
          baseUrl='region'
          terms={regionTerms}
          title='Proyectos por departamento'
        />
        <TermRowStats
          baseUrl='palabra-clave'
          terms={tagsTerms}
          title='Proyectos por palabra clave'
        />
        <TermRowStats
          baseUrl='convenio'
          terms={aliadoTerms}
          title='Proyectos por aliado'
        />
        <TermRowStats
          baseUrl='sello'
          terms={sellosTerms}
          title='Proyectos por impacto y ODS'
        />
        <TermRowStats
          baseUrl='investigador'
          terms={investigadorTerms}
          title='Proyectos por investigador responsable'
        />
      </div>
    </main>
  )
}