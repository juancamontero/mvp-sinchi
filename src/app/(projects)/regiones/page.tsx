import { getAllRegiones } from '@/actions'
import { CustomHeroBanner } from '@/components'
import { TermCard } from '@/projects'

import { TbWorldPin } from 'react-icons/tb'

export function generateMetadata() {
  return {
    title: `Regiones`,
    description: `Lista de regiones y numero de proyectos`,
  }
}

export default async function RegionesPage() {
  const regiones = await getAllRegiones()

  return (
    // todo: Create module styles por pages
    <main className={`pageDefault`}>
      <CustomHeroBanner preTitle='REGIONES' title='DEPARTAMENTOS' />

      <div className='w-full flex flex-col gap-2 justify-start items-start mt-6 p-12'>
        <ul className='grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3 w-full'>
          {regiones.map((term) => (
            <TermCard
              key={term.id}
              icon={<TbWorldPin size={88} />}
              title={term.name}
              projectsCount={term._count.Proyecto}
              id={term.id}
              baseUrl='/region'
            />
          ))}
        </ul>
      </div>
    </main>
  )
}
