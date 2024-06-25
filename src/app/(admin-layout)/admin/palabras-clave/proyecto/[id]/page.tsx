
import {
  getAllTagsForm,
  getProyectoByIdSimple,
  getTagsByProjectIdForm,
} from '@/actions'
import { ProjectTagsForm, TitleAdmin } from '@/admin'


interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props) {
  const {id} = params
  return {
    title: `${id}-id Proyecto - Palabras Clave | edición`,
    description: `Lista de Palabras Claves | edición`,
  }
}

export default async function ProyectoTagsPage({ params }: Props) {
  const { id } = params
  const [project, allTags, projectTags] = await Promise.all([
    getProyectoByIdSimple(Number(id)),
    getAllTagsForm(),
    getTagsByProjectIdForm(Number(id)),
  ])

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición / Eliminación palabras clave del proyecto'
        subTitle={`Proyecto ID: ${id} | ${project?.name ?? 'Sin nombre'}`}
      />
      
      <hr />
      <ProjectTagsForm
        allTags={allTags}
        projectTags={projectTags}
        projectId={Number(id)}
      />
    </div>
  )
}
