import { getIndicadorById } from '@/actions'
import { IndicadorForm, TitleAdmin } from '@/admin'

interface Props {
  params: {
    id: string
  }
}

export default async function EditIndicadorPage({ params }: Props) {
  const { id } = params

  const indicador = await getIndicadorById(Number(id))

  const title = `Editar  ${indicador?.title} | Proyecto id: ${indicador?.proyectoId}`
  const subTitle = `Proyecto: ${indicador?.Proyecto?.name}`

  if (!indicador?.proyectoId)
    return <h1>El indicador no tiene proyecto asociado</h1>

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin title={title} subTitle={subTitle} className='bg-bg-300 p-4' />
      <IndicadorForm
        proyectoId={Number(indicador?.proyectoId)}
        indicador={indicador}
      />
    </div>
  )
}
