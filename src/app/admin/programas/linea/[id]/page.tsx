import { getAllProgramasSimple, getLineaByIdProgramasForm } from '@/actions'
import { LineaProgramasForm, TitleAdmin } from '@/admin'

interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props) {
  const { id } = params
  return {
    title: `${id}-id Línea -> Programas | edición`,
    description: `Lista de programas | edición`,
  }
}

export default async function LineaProgramasPage({ params }: Props) {
  const { id } = params
  const [linea, allProgramas] = await Promise.all([
    getLineaByIdProgramasForm(Number(id)),
    getAllProgramasSimple(),
  ])

  const lineaToProgramaArray =
    linea?.Programa.map((programa) => {
      return programa.id
    }) ?? []
  console.log(lineaToProgramaArray)

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Seleccionar programas de la línea | Edición programas de la línea'
        subTitle={`Línea : ${linea?.preTitle ?? ''} | ${
          linea?.name ?? 'Sin nombre'
        }`}
      />

      <hr />
      
      <LineaProgramasForm
        lineaId={Number(id)}
        allProgramas={allProgramas}
        lineaToProgramas={lineaToProgramaArray}
      />
    </div>
  )
}
