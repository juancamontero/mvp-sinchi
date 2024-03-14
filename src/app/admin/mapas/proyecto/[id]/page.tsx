import { getMapasByProjectId } from '@/actions'
import {
  AccordionForForm,
  MapaForm,
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
    title: `ID: ${id} Proyecto - Mapas | edición`,
    description: `Lista de MAPAS | edición`,
  }
}

export default async function MapasProyectoPage({ params }: Props) {
  const { id } = params

  const mapas = await getMapasByProjectId(Number(id))
  const { Proyecto: project } = mapas[0]

  return (
    <div>
      <TitleAdmin
        title='Mapas del proyecto | Edición'
        subTitle={`Proyecto ID: ${id} | ${project?.name ?? 'Sin nombre'}`}
      />
      <hr />
      <AccordionForForm title='Adicionar mapa'>
        <MapaForm proyectoId={Number(id)} />
      </AccordionForForm>
      <ProjectMapasForm mapas={mapas} />
    </div>
  )
}
