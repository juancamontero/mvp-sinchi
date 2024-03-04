import { getAllTagsForm } from '@/actions'
import { TitleAdmin, TagsForm } from '@/admin'

export function generateMetadata() {
  return {
    title: `Palabras Clave | Administración`,
    description: `Lista de Palabras Clave | Administración`,
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
     
    </div>
  )
}
