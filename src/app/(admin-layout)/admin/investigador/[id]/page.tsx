import { getInvestigadorByIdForm } from '@/actions'
import { InvestigadorForm, LineaForm, ProgramaForm, TitleAdmin } from '@/admin'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export const metadata = {
  title: 'Investigador | Admin',
  description: 'Investigador | Admin',
}

export default async function InvestigadoraAdminPage({ params }: Props) {
  const { id } = params

  const investigador =
    id === 'new' ? null : await getInvestigadorByIdForm(Number(id))

  // * new
  if (!investigador && id !== 'new') {
    redirect('/admin/investigadores')
  }

  const title = id === 'new' ? 'Nuevo investigador' : 'Editar investigador'

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin title={title} className='bg-bg-300 p-1' />

      <InvestigadorForm investigador={investigador ?? {}} />
    </div>
  )
}
//
