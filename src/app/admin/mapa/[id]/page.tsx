import { getMapaById } from '@/actions'
import { CreateUpdateConvenioForm, MapaForm, TitleAdmin } from '@/admin'

interface Props {
  params: {
    id: string
  }
}

export default async function EditMapaPage({ params }: Props) {
  const { id } = params

  const mapa = await getMapaById(Number(id))

  const title = `Editar mapa ${mapa?.title} | Proyecto id: ${mapa?.proyectoId}`
  const subTitle = `Proyecto: ${mapa?.Proyecto?.name}`

  if (!mapa?.proyectoId) return <h1>El mapa no tiene proyecto asociado</h1>

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin title={title} subTitle={subTitle} className='bg-bg-300 p-4' />
      <MapaForm proyectoId={Number(mapa?.proyectoId)} mapa={mapa} />
    </div>
  )
}
