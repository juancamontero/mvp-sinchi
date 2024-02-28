import { getAllTags } from '@/actions'
import { CustomHeroBanner } from '@/components'
import { TermCard } from '@/projects'

import { IoMdBook } from 'react-icons/io'

export function generateMetadata() {
  return {
    title: `Palabras clave`,
    description: `Lista de palabras clave y numero de proyectos`,
  }
}

export default async function GlosarioPage() {
  const tags = await getAllTags()

  return (
    // todo: Create module styles por pages
    <main className={`pageDefault`}>
      <CustomHeroBanner preTitle='PALABRAS' title='CLAVE' />

      <div className='w-full flex flex-col gap-2 justify-start items-start mt-6 p-12'>
        <ul className='grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3 w-full'>
          {tags.map((term) => (
            <TermCard
              key={term.id}
              icon={<IoMdBook size={88} />}
              title={term.name}
              projectsCount={term._count.Proyecto}
              id={term.id}
              baseUrl='/palabra-clave'
            />
          ))}
        </ul>
      </div>
    </main>
  )
}
