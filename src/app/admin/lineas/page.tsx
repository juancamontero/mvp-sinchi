import Link from 'next/link'
import Image from 'next/image'

import { getAllProgramasForm, getAllSellosForm } from '@/actions'
import { SellosForm, TitleAdmin } from '@/admin'

export const metadata = {
  title: 'Líneas investigación | Administración',
  description: 'Lista de Líneas investigación | Administración',
}

export default async function AdminLineasPage() {
  const lineas = await getAllProgramasForm()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición / Eliminación de líneas de investigación'
        subTitle='Click sobre nombre sello para editar'
      />
      <hr />
      <div className='flex flex-row justify-end my-4 w-full'>
        <Link href='/admin/linea/new' className='btn-primary'>
          Nueva línea de investigación
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
                Creado en
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Actualizado en
              </th>

              <th scope='col' className='table-th-header-sinchi'>
                Relación lineas | programas
              </th>
            </tr>
          </thead>
          <tbody className='table-body-sinchi'>
            {lineas.map((linea) => {
              const createAtDate = new Date(linea.createAt ?? 0).toLocaleString(
                'en-US',
                {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }
              )
              const updateAtDate = new Date(linea.updateAt ?? 0).toLocaleString(
                'en-US',
                {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }
              )

              return (
                <tr key={linea.id} className='row-tabla-sinchi '>
                  <td className='table-td-sinchi'>{linea.id}</td>
                  <td className='table-td-sinchi w-16'>
                    <Image
                      src={linea.imagen?.url ?? '/images/placeholder-img.jpeg'}
                      alt={'Imagen destacada proyecto'}
                      width={64}
                      height={64}
                    />
                  </td>
                  <td className='table-td-sinchi w-80 text-ellipsis hover:underline'>
                    <Link href={`/admin/linea/${linea.id}`}>
                      {linea.preTitle}-{linea.name}
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>{createAtDate}</td>
                  <td className='table-td-sinchi'>{updateAtDate}</td>
                  <td className='table-td-sinchi'>
                    <Link
                      href={`/admin/programas/linea/${linea.id}`}
                      className='btn-table'
                    >
                      Editar relación líneas | programas
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
