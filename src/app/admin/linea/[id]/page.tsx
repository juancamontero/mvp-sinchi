import { getLineaByIdForm, getProgramaByIdForm } from '@/actions'
import { LineaForm, TitleAdmin } from '@/admin'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function LineaAdminPage({ params }: Props) {
  const { id } = params

  const linea = id === 'new' ? null : await getLineaByIdForm(Number(id))

  // * new Projects
  if (!linea && id !== 'new') {
    redirect('/admin/lineas')
  }

  const title =
    id === 'new' ? 'Nueva Línea investigación' : 'Editar Línea investigación'

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin title={title} className='bg-bg-300 p-1' />

      <LineaForm linea={linea ?? {}} />
    </div>
  )
}
//
