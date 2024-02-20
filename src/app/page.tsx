import { HomeHeroBanner } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { LineasListProjectsSection, getAllLineas } from '@/projects'

import styles from '../Defaults.module.css'

export function generateMetadata() {
  return {
    title: `SINCHI | Líneas de investigación`,
    description: `Líneas de investigación y sus proyectos`,
  }
}

export default async function Home() {
  const lineas = await getAllLineas()

  return (
    // todo: Create module styles por pages
    <main className={styles.pageDefault}>
      <HomeHeroBanner title={'Conoce nuestros proyectos en ejecución'} subTitle={'Proyectos de 2023 a 2024'} />
      <LineasListProjectsSection lineas={lineas} />
    </main>
  )
}
