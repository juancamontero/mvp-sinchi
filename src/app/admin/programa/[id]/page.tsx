import {
  getAllInvestigadoresForm,
  getAllLineas,
  getAllProgramas,
  getProgramaByIdForm,
  getProyectoByIdSimple,
} from '@/actions'
import { LineaForm, ProgramaForm, ProjectForm, TitleAdmin } from '@/admin'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function ProgramaAdminPage({ params }: Props) {
  const { id } = params

  const programa = id === 'new' ? null : await getProgramaByIdForm(Number(id))

  // * new
  if (!programa && id !== 'new') {
    redirect('/admin/programas')
  }

  const title =
    id === 'new'
      ? 'Nuevo Programa investigación'
      : 'Editar Programa investigación'

  return (
    <div className='pageDefault w-full'>
        
      <TitleAdmin title={title} className='bg-bg-300 p-1' />
      
      <ProgramaForm programa={programa ?? {}} />
    </div>
  )
}
//
