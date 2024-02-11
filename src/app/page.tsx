import { HomeHeroBanner } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { LineasListProjectsSection, getAllLineas } from '@/projects'


import styles from '../Defaults.module.css'

export default async function Home() {

  const lineas = await getAllLineas() 
  

  return (
    // todo: Create module styles por pages
    <main className={styles.pageDefault}>
      <HomeHeroBanner />
      <LineasListProjectsSection lineas={lineas} />
    </main>
  )
}
