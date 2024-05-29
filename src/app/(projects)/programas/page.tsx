import { getAllProgramas } from '@/actions'
import { HomeHeroBanner, MenuButtonsHorizontal } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { ProgramasListProjectsSection } from '@/projects'


export function generateMetadata() {
  return {
    title: `SINCHI | Programas de investigación`,
    description: `Programas de investigación y sus proyectos`,
  }
}

export default async function ProgramasPage() {
  const programas = await getAllProgramas()

  return (
    // todo: Create module styles por pages
    <main className={`pageDefault`}>
      <HomeHeroBanner
        title={'Conoce nuestros programas de investigación'}
        subTitle={'Proyectos agrupados por programa de 2023 a 2024'}
      >
        <MenuButtonsHorizontal
          menuItems={[
            { url: '/', text: 'Líneas de investigación' },
            { url: '/programas', text: 'Programas de investigación' },
          ]}
        />
      </HomeHeroBanner>
      <ProgramasListProjectsSection programas={programas} />
    </main>
  )
}
