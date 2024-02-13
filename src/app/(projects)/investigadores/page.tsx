import { CustomHeroBanner } from '@/components'
// import { lineasSeed } from '@/projects/helpers/dataSeed'
import { TermCard, getAllInvestigadores } from '@/projects'

import styles from '../../../Defaults.module.css'
import { IoAddCircleOutline } from 'react-icons/io5'
import { BsPerson } from 'react-icons/bs'

export default async function InvestigadoresPage() {
  const investigadores = await getAllInvestigadores()

  return (
    // todo: Create module styles por pages
    <main className={styles.pageDefault}>
      <CustomHeroBanner title='INVESTIGADORES' />

      <div className='w-full flex flex-col gap-2 justify-start items-start mt-6 p-12'>
        <ul className='grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3 w-full'>
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
