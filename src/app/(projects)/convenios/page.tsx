import { CustomHeroBanner } from '@/components'
import { TermCard, getAllConvenios } from '@/projects'

import styles from '../../../Defaults.module.css'

import { PiHandshakeLight } from 'react-icons/pi'

export function generateMetadata() {
  return {
    title: `Convenios | Asociados`,
    description: `Lista de convenios/asociados y numero de proyectos`,
  }
}

export default async function ConveniosPage() {
  const convenios = await getAllConvenios()

  return (
    // todo: Create module styles por pages
    <main className={styles.pageDefault}>
      <CustomHeroBanner preTitle='CONVENIOS' title='| ASOCIADOS' />

      <div className='w-full flex flex-col gap-2 justify-start items-start mt-6 p-12'>
        <ul className='grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3 w-full'>
          {convenios.map((term) => (
            <TermCard
              key={term.id}
              icon={<PiHandshakeLight size={88} />}
              title={term.name}
              projectsCount={term._count.Proyecto}
              id={term.id}
              baseUrl='/convenio'
            />
          ))}
        </ul>
      </div>
    </main>
  )
}
