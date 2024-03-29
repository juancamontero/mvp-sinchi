import {
  getAllInvestigadoresForm,
  getAllLineas,
  getAllProgramas,
  getProyectoByIdSimple,
} from '@/actions'
import { ProjectForm, TitleAdmin } from '@/admin'
import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const { id } = params
  const title = id === 'new' ? 'Nuevo proyecto' : `${id} | Editar  proyecto`

  return { title: title }
}

export default async function ProjectAdminPage({ params }: Props) {
  const { id } = params

  const [project, lineas, programas, investigadores] = await Promise.all([
    id === 'new' ? null : getProyectoByIdSimple(Number(id)),
    getAllLineas(),
    getAllProgramas(),
    getAllInvestigadoresForm(),
  ])

  // * new Projects
  if (!project && id !== 'new') {
    redirect('/admin/projects')
  }

  const title = id === 'new' ? 'Nuevo Proyecto' : 'Editar Proyecto'

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin title={title} className='bg-bg-300 p-1' />

      <ProjectForm
        project={project ?? {}}
        lineas={lineas}
        programas={programas}
        investigadores={investigadores}
      />
    </div>
  )
}
