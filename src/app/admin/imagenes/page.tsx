import { getAllImages } from '@/actions'
import { TitleAdmin, TagsForm, ImagesFormGrid } from '@/admin'

export const metadata = {
  title: 'Imágenes | Administración',
  description: 'Imágenes | Administración',
}

export default async function ImagesPage() {
  const images = await getAllImages()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin 
      title='Administración de imágenes' 
      subTitle='Al eliminar la imagen se borrará también de los otros lugares dónde la ha usado'
      />
      {!images && <h1>No se pudieron cargar las imágenes</h1>}
      <ImagesFormGrid images={images} />

      <hr />
    </div>
  )
}
