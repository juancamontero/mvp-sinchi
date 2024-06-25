import { ProjectsCarousel } from '@/projects'

import {
  CustomHeroBanner,
  HomeHeroBanner,
  LoaderDefault,
  MenuButtonsHorizontal,
} from '@/components'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getRegionById, getProjectsByRegionId } from '@/actions'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params
    const region = await getRegionById(Number(id))

    return {
      title: `${region?.name ?? ''} | Proyectos`,
      description: `Proyectos en el departamento ${region?.name ?? ''}`,
    }
  } catch (error) {
    return {
      title: `Proyectos`,
      description: `Error : ${error}`,
    }
  }
}

export default async function RegionPage({ params }: Props) {
  const { id } = params

  const [region, proyectos] = await Promise.all([
    getRegionById(Number(id)),
    getProjectsByRegionId(Number(id)),
  ])

  return (
    <main className={`pageTermDefault`}>
      <HomeHeroBanner
        title={`Proyectos en ${region?.name}`}
        subTitle={`${proyectos.length} proyectos` ?? ''}
      >
        <MenuButtonsHorizontal
          menuItems={[
            { url: '/', text: 'Líneas de investigación' },
            { url: '/programas', text: 'Programas de investigación' },
            { url: '/buscar', text: 'Regresar a búsqueda' },
          ]}
        />
      </HomeHeroBanner>
      <section className='h-full flex flex-col lg:justify-start justify-center items-center bg-bg-300 w-full mt-0 pt-10'>
        <Suspense fallback={<LoaderDefault />}>
          <ProjectsCarousel proyectos={proyectos} />
        </Suspense>
      </section>
    </main>
  )
}
