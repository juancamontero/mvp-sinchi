
import {
    getAllRegionsForm,
  getAllTagsForm,
  getProyectoByIdSimple,
  getRegionsByProjectIdForm,
  getTagsByProjectIdForm,
} from '@/actions'
import { ProjectRegionsForm, ProjectTagsForm, TitleAdmin } from '@/admin'



interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props) {
  const {id} = params
  return {
    title: `${id}-id Proyecto - Regiones | edición`,
    description: `Lista de regiones | edición`,
  }
}

export default async function ProyectoTagsPage({ params }: Props) {
  const { id } = params
  const [project, allRegiones, projectRegions] = await Promise.all([
    getProyectoByIdSimple(Number(id)),
    getAllRegionsForm(),
    getRegionsByProjectIdForm(Number(id)),
  ])

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición / Eliminación Regiones del proyecto'
        subTitle={`Proyecto ID: ${id} | ${project?.name ?? 'Sin nombre'}`}
      />
      
      <hr />
      <ProjectRegionsForm
        allRegions={allRegiones}
        projectRegions={projectRegions}
        projectId={Number(id)}
      />
    </div>
  )
}
