import { getAllLineas } from '@/actions'
import { HomeHeroBanner, MenuButtonsHorizontal } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { LineasListProjectsSection } from '@/projects'
import Link from 'next/link'

export function generateMetadata() {
  return {
    title: `SINCHI | Líneas de investigación`,
    description: `Líneas de investigación y sus proyectos`,
  }
}

export default async function Home() {
  const lineas = await getAllLineas()
  // console.log(lineas)

  return (
    // todo: Create module styles por pages
    <main className={`pageDefault`}>
      <HomeHeroBanner
        title={'Conoce nuestros proyectos en ejecución'}
        subTitle={'Proyectos de 2023 a 2024'}
        buttonLink='/programas'
        buttonText='Programas de investigación'
      >
        <MenuButtonsHorizontal
          menuItems={[
            { url: '/', text: 'Líneas de investigación' },
            { url: '/programas', text: 'Programas de investigación' },
          ]}
        />
      </HomeHeroBanner>
      <LineasListProjectsSection lineas={lineas} />
    </main>
  )
}
