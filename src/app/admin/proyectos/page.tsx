import Image from 'next/image'
import Link from 'next/link'

import { getAllProjectsForm } from '@/actions'
import { TitleAdmin } from '@/admin'

export default async function AdminProjectsPage() {
  const proyectos = await getAllProjectsForm()
  return (
    <div className='max-w-full'>
      <TitleAdmin
        title={'Mantenimiento de proyectos'}
        subTitle='Click sobre nombre del proyecto para editar '
      />
      <hr />
      <div className='flex justify-end my-4'>
        <Link href='/admin/proyecto/new' className='btn-primary'>
          Nuevo proyecto
        </Link>
      </div>

      {/* table  */}

      <div className='mt-4 w-full overflow-hidden border border-gray-200'>
        <table className='min-w-full divide-y divide-gray-700'>
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
              <th scope='col' className='table-th-header-sinchi'>
                Línea
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Programa
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Creado en
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Actualizado en
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
            </tr>
          </thead>
          <tbody className='table-body-sinchi'>
            {proyectos.map((proyecto) => {
              const createAtDate = new Date(
                proyecto.createAt ?? 0
              ).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              const updateAtDate = new Date(
                proyecto.updateAt ?? 0
              ).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
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
                  <td className='table-td-sinchi w-80 text-ellipsis hover:underline'>
                    <Link href={`/admin/proyecto/${proyecto.id}`}>
                      {proyecto.name}
                    </Link>
                  </td>

                  <td className='table-td-sinchi'>{proyecto.year}</td>
                  <td className='table-td-sinchi w-60'>
                    {proyecto.linea?.preTitle} | {proyecto.linea?.name}
                  </td>

                  <td className='table-td-sinchi w-60'>
                    {proyecto.programa?.preTitle} | {proyecto.programa?.name}
                  </td>
                  <td className='table-td-sinchi'>{createAtDate}</td>
                  <td className='table-td-sinchi'>{updateAtDate}</td>
                  <td className='table-td-sinchi'>
                    <Link
                      href={`/admin/palabras-clave/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>
                    <Link
                      href={`/admin/convenios/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>
                    <Link
                      href={`/admin/regiones/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>
                    <Link
                      href={`/admin/mapas/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>
                    <Link
                      href={`/admin/sellos/proyecto/${proyecto.id}`}
                      className='btn-table'
                    >
                      Editar
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>
                    <Link
                      href={`/admin/indicadores/proyecto/${proyecto.id}`}
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
