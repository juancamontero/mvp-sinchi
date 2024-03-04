import {
  getAllConveniosFormSimple,
  getConveniosByProjectIdForm,
  getProyectoByIdSimple,
} from '@/actions'
import { ProjectConveniosForm, ProjectTagsForm, TitleAdmin } from '@/admin'

interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props) {
  const { id } = params
  return {
    title: `${id}-id Proyecto - Aliados | edición`,
    description: `Lista de aliados | edición`,
  }
}

export default async function ProyectoConveniosPage({ params }: Props) {
  const { id } = params
  const [project, allConvenios, projectConvenios] = await Promise.all([
    getProyectoByIdSimple(Number(id)),
    getAllConveniosFormSimple(),
    getConveniosByProjectIdForm(Number(id)),
  ])

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Seleccionar aliados del proyecto | Edición aliados del proyecto'
        subTitle={`Proyecto ID: ${id} | ${project?.name ?? 'Sin nombre'}`}
      />

      <hr />
      <ProjectConveniosForm
        projectId={Number(id)}
        allConvenios={allConvenios}
        projectConvenios={projectConvenios}
      />
    </div>
  )
}
