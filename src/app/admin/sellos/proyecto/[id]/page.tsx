import {
  getAllSellosFormSimple,
  getProyectoByIdSimple,
  getSellosByProjectIdForm,
} from '@/actions'
import { ProjectSellosForm, TitleAdmin } from '@/admin'

interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props) {
  const { id } = params
  return {
    title: `${id}-id Proyecto - Sellos | edición`,
    description: `Lista de sellos | edición`,
  }
}

export default async function ProyectoSellosPage({ params }: Props) {
  const { id } = params
  const [project, allSellos, projectSello] = await Promise.all([
    getProyectoByIdSimple(Number(id)),
    getAllSellosFormSimple(),
    getSellosByProjectIdForm(Number(id)),
  ])

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Seleccionar sellos del proyecto | Edición sellos del proyecto'
        subTitle={`Proyecto ID: ${id} | ${project?.name ?? 'Sin nombre'}`}
      />

      <hr />
      <ProjectSellosForm
        projectId={Number(id)}
        allSellos={allSellos}
        projectSellos={projectSello}
      />
    </div>
  )
}
