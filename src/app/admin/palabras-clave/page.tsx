import { getAllTagsForm } from '@/actions'
import { TitleAdmin, ProjectTagsForm, TagsForm } from '@/admin'
import Link from 'next/link'

export function generateMetadata() {
  return {
    title: `Palabras Clave | edición`,
    description: `Lista de Palabras Calves | edición`,
  }
}

export default async function PalabrasClavePage() {
  const tags = await getAllTagsForm()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin 
      title='Edición / Eliminación de todas palabras clave'
      subTitle='Click sobre palabra para editar'
      />

      <hr />
      <TagsForm tags={tags} />
      {/* <ProjectTagsForm allTags={allTags} projectTags={projectTags} projectId={Number(id)}/> */}
    </div>
  )
}
