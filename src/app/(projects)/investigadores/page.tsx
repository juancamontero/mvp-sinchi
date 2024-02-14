import { CustomHeroBanner } from '@/components'
import { TermCard, getAllInvestigadores } from '@/projects'

import styles from '../../../Defaults.module.css'
import { BsPerson } from 'react-icons/bs'



export function generateMetadata() {
  return {
    title: `Investigadores responsables`,
    description: `Lista de investigadores y numero de proyectos`,
  }
}

export default async function InvestigadoresPage() {
  const investigadores = await getAllInvestigadores()

  return (
    // todo: Create module styles por pages
    <main className={styles.pageDefault}>
      <CustomHeroBanner title='INVESTIGADORES' postTitle='RESPONSABLES' />

      <div className={styles.pageSectionGrid}>
        <ul className={styles.gridTerms}>
          {investigadores.map((investigador) => (
            <TermCard
              key={investigador.id}
              icon={<BsPerson size={88} />}
              title={investigador.name}
              subTitle={investigador.email}
              projectsCount={investigador._count.Proyecto}
              id={investigador.id}
              baseUrl='/investigador'
            />
          ))}
        </ul>
      </div>
    </main>
  )
}
