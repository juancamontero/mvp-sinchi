import { ProjectsCarousel } from '@/projects'

import { CustomHeroBanner, LoaderDefault } from '@/components'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getTagById, getProjectsByTagId } from '@/actions'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params
    const tag = await getTagById(Number(id))

    return {
      title: `${tag?.name ?? ''} |Proyectos`,
      description: `Proyectos de ${tag?.name ?? ''}`,
    }
  } catch (error) {
    return {
      title: `Proyectos`,
      description: `Error : ${error}`,
    }
  }
}

export default async function TagPage({ params }: Props) {
  const { id } = params

  const [tag, proyectos] = await Promise.all([
    getTagById(Number(id)),
    getProjectsByTagId(Number(id)),
  ])

  return (
    <main className={`pageDefault`}>
      <CustomHeroBanner
        preTitle={`${proyectos.length}` ?? ''}
        title={tag?.name ?? 'PALABRA CLAVE'}
        postTitle='Palabra clave'
      />

      <Suspense fallback={<LoaderDefault />}>
        <ProjectsCarousel proyectos={proyectos} />
      </Suspense>
    </main>
  )
}
