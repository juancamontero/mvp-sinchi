import { getMediosByProjectId, getProyectoByIdSimple } from '@/actions'
import {
  AccordionForForm,
  MedioForm,
  ProjectMediosForm,
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
    title: `ID: ${id} Medios (Fotos y videos)`,
    description: `Lista de imágenes y videos del proyecto`,
  }
}

export default async function MediosProyectoPage({ params }: Props) {
  const { id } = params

  const medios = await getMediosByProjectId(Number(id))

  const project =
    medios.length > 0
      ? medios[0].Proyecto
      : await getProyectoByIdSimple(Number(id))

  return (
    <div>
      <TitleAdmin
        title='Medios del proyecto | Edición'
        subTitle={`Proyecto ID: ${id} | ${project?.name ?? 'Sin nombre'}`}
      />
      <hr />

      <AccordionForForm title='Adicionar multimedia'>
        <MedioForm proyectoId={Number(id)} />
        
      </AccordionForForm>

      <ProjectMediosForm medios={medios} />

    </div>
  )
}
