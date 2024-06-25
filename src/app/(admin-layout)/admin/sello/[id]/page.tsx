import { getConvenioByIdForm, getSelloByIdForm } from '@/actions'
import {
  CreateUpdateSellosForm,
  TitleAdmin,
} from '@/admin'
import type { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params

  const sello = id !== 'new' ? await getSelloByIdForm(Number(id)) : null
  const title = id === 'new' ? 'Nuevo sello' : `Editar sello ${sello?.name}`

  return { title }
}

export default async function EditSelloPage({ params }: Props) {
  const { id } = params

  const sello = id !== 'new' ? await getSelloByIdForm(Number(id)) : null
  const title = id === 'new' ? 'Nuevo sello' : `Editar sello ${sello?.name}`

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin title={title} className='bg-bg-300 p-4' />

      <CreateUpdateSellosForm sello={sello ?? undefined} />
    </div>
  )
}
