import {
  ProjectsCarousel,
  getInvestigadorById,
  getProjectsByInvestigadorId,
} from '@/projects'
import styles from '../../../../Defaults.module.css'
import { CustomHeroBanner, LoaderDefault } from '@/components'
import { Suspense } from 'react'

interface Props {
  params: {
    id: number
  }
}

export default async function InvestigadorPage({ params }: Props) {
  const { id } = params
  const investigador = await getInvestigadorById(Number(id))
  const proyectos = await getProjectsByInvestigadorId(Number(id))

  return (
    <main className={styles.pageDefault}>
      <CustomHeroBanner
        preTitle={`${proyectos.length}` ?? ''}
        title={investigador?.name ?? 'INVESTIGADOR'}
        postTitle='Investigador responsable'
      />

      <Suspense fallback={<LoaderDefault />}>
        <ProjectsCarousel proyectos={proyectos} />
      </Suspense>
    </main>
  )
}
