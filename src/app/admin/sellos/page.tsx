import { getAllSellosForm } from '@/actions'
import { SellosForm, TitleAdmin } from '@/admin'

export const metadata = {
  title: 'Sellos | Administración',
  description: 'Sellos | Administración',
}

export default async function AdminSellosPage() {
  const sellos = await getAllSellosForm()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición / Eliminación de sellos'
        subTitle='Click sobre nombre sello para editar'
      />
      <hr />
      <SellosForm sellos={sellos} />
  
    </div>
  )
}
