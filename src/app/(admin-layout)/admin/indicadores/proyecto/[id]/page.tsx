import {
  getIndicadoresByProjectId,
  getMapasByProjectId,
  getProyectoByIdSimple,
} from '@/actions'
import {
  AccordionForForm,
  IndicadorForm,
  MapaForm,
  ProjectIndicadoresForm,
  ProjectMapasForm,
  TitleAdmin,
} from '@/admin'

interface Props {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: Props) {
  const { id } = params

  return {
    title: `ID: ${id} Indicadores (IMGs) | edición`,
    description: `Lista de imágenes de indicadores | edición`,
  }
}

export default async function IndicadoresProyectoPage({ params }: Props) {
  const { id } = params

  const indicadores = await getIndicadoresByProjectId(Number(id))

  const project =
    indicadores.length > 0
      ? indicadores[0].Proyecto
      : await getProyectoByIdSimple(Number(id))

  return (
    <div>
      <TitleAdmin
        title='Indicadores del proyecto | Edición'
        subTitle={`Proyecto ID: ${id} | ${project?.name ?? 'Sin nombre'}`}
      />
      <hr />
      <AccordionForForm title='Adicionar imagen indicador'>
        <IndicadorForm proyectoId={Number(id)} />
      </AccordionForForm>
      <ProjectIndicadoresForm indicadores={indicadores} />
    </div>
  )
}
