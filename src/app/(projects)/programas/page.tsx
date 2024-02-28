import { getAllProgramas } from '@/actions'
import { HomeHeroBanner } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { ProgramasListProjectsSection} from '@/projects'




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
      <HomeHeroBanner title={'Conoce nuestros programas de investigación'} subTitle={'Proyectos agrupados por programa de 2023 a 2024'} />
      <ProgramasListProjectsSection programas={programas} />
    </main>
  )
}
