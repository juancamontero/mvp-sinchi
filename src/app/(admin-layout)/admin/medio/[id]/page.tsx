import { Metadata } from 'next'

import {  getMedioById } from '@/actions'
import {  MedioForm, TitleAdmin } from '@/admin'

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params
    const medio = await getMedioById(Number(id))
    if (!medio) return { title: 'No encontrado' }
    return { title: `Medios| ${medio.Proyecto.name}` }
  }


export default async function EditMedioPage({ params }: Props) {
  const { id } = params

  const medio = await getMedioById(Number(id))

  const title = `Editar  ${medio?.title} | Proyecto id: ${medio?.proyectoId}`
  const subTitle = `Proyecto: ${medio?.Proyecto?.name}`

  if (!medio?.proyectoId)
    return <h1>El medio no tiene proyecto asociado</h1>

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin title={title} subTitle={subTitle} className='bg-bg-300 p-4' />
      <MedioForm
        proyectoId={Number(medio?.proyectoId)}
        medio={medio}
      />
    </div>
  )
}
