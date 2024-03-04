import { getAllRegionsForm, } from '@/actions'
import { RegionsForm, TitleAdmin,  } from '@/admin'

export function generateMetadata() {
  return {
    title: `Regiones | Administración`,
    description: `Lista de regiones | Administración`,
  }
}

export default async function AdminRegionesPage() {
  const regiones = await getAllRegionsForm()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición regiones (departamentos)'
        subTitle='Click sobre región para editar'
      />

      <hr />
      <RegionsForm regions={regiones} />
    </div>
  )
}
