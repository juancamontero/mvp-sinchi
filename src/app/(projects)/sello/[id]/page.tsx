import { ProjectsCarousel } from '@/projects'

import {
  HomeHeroBanner,
  LoaderDefault,
  MenuButtonsHorizontal,
} from '@/components'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { getSelloById } from '@/actions/sellos/sellos-actions'
import { getProjectsBySelloId } from '@/actions/proyectos/proyectos-report'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params
    const sello = await getSelloById(Number(id))

    return {
      title: `${sello?.name ?? ''} |Proyectos`,
      description: `Proyectos bajo sello ${sello?.name ?? ''}`,
    }
  } catch (error) {
    return {
      title: `Proyectos`,
      description: `Error : ${error}`,
    }
  }
}

export default async function SelloPage({ params }: Props) {
  const { id } = params

  const [sello, proyectos] = await Promise.all([
    await getSelloById(Number(id)),
    await getProjectsBySelloId(Number(id)),
  ])

  return (
    <main className={`pageTermDefault`}>
      <HomeHeroBanner
        title={`${proyectos.length} proyecto(s) con el sello:`} // ${sello?.name}
        // subTitle={`${proyectos.length} proyecto(s)` ?? ''}
      >
  
        <div className='flex flex-row justify-center gap-2 lg:max-w-sm max-w-xs mt-1'>
          {sello?.imagen && (
            <div className=''>
              <Image
                src={sello?.imagen?.url}
                alt={sello?.name}
                width={60}
                height={60}
                className='my-1'
              />
            </div>
          )}
          <h3 className='text-left text-sm text-text-100  leading-4 my-auto w-2/3'>
            {sello?.name}
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
