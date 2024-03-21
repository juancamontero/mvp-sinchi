import { getAllConveniosForm } from '@/actions'
import { ConveniosForm, TitleAdmin } from '@/admin'

export const metadata = {
  title: 'Aliados | Administración',
  description: 'Aliados | Administración',
}

export default async function AdminConveniosPage() {
  const convenios = await getAllConveniosForm()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición / Eliminación de aliados'
        subTitle='Click sobre palabra para editar'
      />
        <ConveniosForm convenios={convenios} />
    </div>
  )
}
