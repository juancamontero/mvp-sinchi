import { Metadata } from 'next'
import {
  getAllTagsForm,
  getProyectoByIdSimple,
  getTagsByProjectIdForm,
} from '@/actions'
import { ProjectTagsForm, TitleAdmin } from '@/admin'
import Link from 'next/link'


interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props) {
  const {id} = params
  return {
    title: `${id}-id Proyecto - Palabras Clave | edición`,
    description: `Lista de Palabras Calves | edición`,
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
      <div className='flex flex-row justify-end my-4 w-full'>
        <Link href='/admin/palabra-clave/new' className='btn-primary'>
          Nueva palabra clave
        </Link>
      </div>
      <hr />
      <ProjectTagsForm
        allTags={allTags}
        projectTags={projectTags}
        projectId={Number(id)}
      />
    </div>
  )
}
