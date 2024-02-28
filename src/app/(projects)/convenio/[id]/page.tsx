import { ProjectsCarousel } from '@/projects'

import { CustomHeroBanner, LoaderDefault } from '@/components'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getConvenioById, getProjectsByConvenioId } from '@/actions'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params
    const convenio = await getConvenioById(Number(id))

    return {
      title: `${convenio?.name ?? ''} |Proyectos`,
      description: `Proyectos con ${convenio?.name ?? ''}`,
    }
  } catch (error) {
    return {
      title: `Proyectos`,
      description: `Error : ${error}`,
    }
  }
}

export default async function ConvenioPage({ params }: Props) {
  const { id } = params

  const [convenio, proyectos] = await Promise.all([
    await getConvenioById(Number(id)),
    await getProjectsByConvenioId(Number(id)),
  ])

  return (
    <main className={`pageDefault`}>
      <CustomHeroBanner
        preTitle={`${proyectos.length}` ?? ''}
        title={convenio?.name ?? 'CONVENIO'}
        postTitle='Convenio | asociado'
      />

      <Suspense fallback={<LoaderDefault />}>
        <ProjectsCarousel proyectos={proyectos} />
      </Suspense>
    </main>
  )
}
