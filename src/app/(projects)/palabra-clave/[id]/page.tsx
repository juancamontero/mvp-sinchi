import { ProjectsCarousel } from '@/projects'

import {
  CustomHeroBanner,
  HomeHeroBanner,
  LoaderDefault,
  MenuButtonsHorizontal,
} from '@/components'
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
      <HomeHeroBanner
        title={`Palabra clave: ${tag?.name}`}
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
