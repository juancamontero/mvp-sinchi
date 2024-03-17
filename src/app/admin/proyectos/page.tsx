import Image from 'next/image'
import Link from 'next/link'

import { getAllProjectsForm } from '@/actions'
import { TitleAdmin } from '@/admin'

export default async function AdminProjectsPage() {
  const proyectos = await getAllProjectsForm()
  return (
    <div className='max-w-full flex flex-col justify-start items-start w-full h-screen'>
      
      {/* TITULO Y BOTON NUEVO */}
      <div className='flex sm:flex-row flex-col sm:justify-evenly justify-start items-center w-full'>
        <div className='sm:w-5/6 w-full'>
          <TitleAdmin
            title={'Mantenimiento de proyectos'}
            subTitle='Click sobre nombre del proyecto para editar '
          />
        </div>
        <div className='flex justify-end my-auto'>
          <Link href='/admin/proyecto/new' className='btn-primary'>
            Nuevo proyecto
          </Link>
        </div>
      </div>

      {/* table  */}
      <div className='mt-2 w-full overflow-auto flex-grow border border-bg-400'>
        <table className='relative w-full border'>
          <thead className='table-sinchi-head table-auto'>
            <tr>
              <th scope='col' className='table-th-header-sinchi'>
                id
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Imagen
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Nombre
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Año
              </th>
              <th scope='col' className='table-th-header-sinchi w-40'>
                Línea
              </th>
              <th scope='col' className='table-th-header-sinchi w-40'>
                Programa
              </th>
              <th scope='col' className='table-th-header-sinchi w-12'>
                Creado
              </th>
              <th scope='col' className='table-th-header-sinchi w-12'>
                Actualizado
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Palabras claves
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Aliados
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Departamentos
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Mapas (localización geográfica)
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Sellos
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Imágenes indicadores
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Multimedia
              </th>
            </tr>
          </thead>
          <tbody className='table-body-sinchi'>
            {proyectos.map((proyecto) => {
              const createAtDate = new Date(
                proyecto.createAt ?? 0
              ).toLocaleString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
              })
              const updateAtDate = new Date(
                proyecto.updateAt ?? 0
              ).toLocaleString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
              })

              return (
                <tr key={proyecto.id} className='row-tabla-sinchi '>
                  <td className='table-td-sinchi'>{proyecto.id}</td>
                  <td className='table-td-sinchi w-16'>
                    <Image
                      src={
                        proyecto.imagen?.url ?? '/images/placeholder-img.jpeg'
                      }
                      alt={'Imagen destacada proyecto'}
                      width={64}
                      height={64}
                    />
                  </td>
                  <td className='table-td-sinchi w-60 text-ellipsis hover:underline'>
                    <Link href={`/admin/proyecto/${proyecto.id}`}>
                      {proyecto.name}
                    </Link>
                  </td>

                  <td className='table-td-sinchi'>{proyecto.year}</td>
                  <td className='table-td-sinchi w-52'>
                    {proyecto.linea?.preTitle} | {proyecto.linea?.name}
                  </td>

                  <td className='table-td-sinchi w-52'>
                    {proyecto.programa?.preTitle} | {proyecto.programa?.name}
                  </td>
                  <td className='table-td-sinchi'>{createAtDate}</td>
                  <td className='table-td-sinchi'>{updateAtDate}</td>
                  <td className='text-center my-auto'>
                    <Link
                      href={`/admin/palabras-clave/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='text-center my-auto'>
                    <Link
                      href={`/admin/convenios/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='text-center my-auto'>
                    <Link
                      href={`/admin/regiones/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='text-center my-auto'>
                    <Link
                      href={`/admin/mapas/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='text-center my-auto'>
                    <Link
                      href={`/admin/sellos/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='text-center my-auto'>
                    <Link
                      href={`/admin/indicadores/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='text-center my-auto'>
                    <Link
                      href={`/admin/medios/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
