import { HomeHeroBanner } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { ProgramasListProjectsSection, getAllProgramas } from '@/projects'

import styles from '../../../Defaults.module.css'


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
    <main className={styles.pageDefault}>
      <HomeHeroBanner />
      <ProgramasListProjectsSection programas={programas} />
    </main>
  )
}
