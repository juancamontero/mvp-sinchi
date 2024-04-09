import { ProjectsCarousel } from '@/projects'

import { CustomHeroBanner, LoaderDefault } from '@/components'
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
    <main className={`pageDefault`}>
      <CustomHeroBanner
        postTitle={`${proyectos.length} proyectos` ?? ''}
        preTitle='Proyectos en'
        title={region?.name ?? 'REGION'}
      />
      <section className='h-full flex flex-col justify-center items-center bg-bg-300 w-full'>
        <Suspense fallback={<LoaderDefault />}>
          <ProjectsCarousel proyectos={proyectos} />
        </Suspense>
      </section>
    </main>
  )
}
