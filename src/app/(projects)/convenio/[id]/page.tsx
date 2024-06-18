import { ProjectsCarousel } from '@/projects'

import {
  CustomHeroBanner,
  HomeHeroBanner,
  LoaderDefault,
  MenuButtonsHorizontal,
} from '@/components'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getConvenioById, getProjectsByConvenioId } from '@/actions'
import Image from 'next/image'

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
      <HomeHeroBanner
        title={`Aliado: ${convenio?.name}`}
        subTitle={`${proyectos.length} proyecto(s)` ?? ''}
      >
        <div className='flex flex-row justify-center gap-2 lg:max-w-sm max-w-xs mt-1'>
          {convenio?.imagen && (
            <div className=''>
              <Image
                src={convenio?.imagen?.url}
                alt={convenio?.name}
                width={80}
                height={80}
                className='my-1 bg-bg-100 p-1 max-h-12 object-contain'
              />
            </div>
          )}
          <h3 className='text-left text-sm text-text-100  leading-4 my-auto w-2/3'>
            {convenio?.name}
          </h3>
        </div>
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
