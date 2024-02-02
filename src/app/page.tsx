import { HomeHeroBanner } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { LineasListProjectsSection, getAllLineas } from '@/projects'
import { LineaCarouselProps } from '@/projects/components/LineaCarouselProjects'

import styles from '../Defaults.module.css'

export default async function Home() {

  const lineasSeed = await getAllLineas() 
  let lineas: LineaCarouselProps[] = []
  lineasSeed.forEach((linea) => {
    const newLinea = {
      id: linea.id,
      slug: linea.slug,
      name: linea.name,
    }
    lineas.push(newLinea)
  })

  return (
    // todo: Create module styles por pages
    <main className={styles.pageDefault}>
      <HomeHeroBanner />
      <LineasListProjectsSection lineas={lineas} />
    </main>
  )
}
