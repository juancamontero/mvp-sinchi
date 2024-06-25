import Link from 'next/link'
import Image from 'next/image'

import { getAllProgramasForm } from '@/actions'
import { TitleAdmin } from '@/admin'

export const metadata = {
  title: 'Programas investigación | Administración',
  description: 'Lista de Programas investigación | Administración',
}

export default async function AdminProgramsPage() {
  const programas = await getAllProgramasForm()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición / Eliminación de programas de investigación'
        subTitle='Click sobre nombre programa para editar'
      />
      <hr />
      <div className='flex flex-row justify-end my-4 w-full'>
        <Link href='/admin/programa/new' className='btn-primary'>
          Nuevo programas de investigación
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
            </tr>
          </thead>
          <tbody className='table-body-sinchi'>
            {programas.map((programa) => {
              const createAtDate = new Date(
                programa.createAt ?? 0
              ).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              const updateAtDate = new Date(
                programa.updateAt ?? 0
              ).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })

              return (
                <tr key={programa.id} className='row-tabla-sinchi '>
                  <td className='table-td-sinchi'>{programa.id}</td>
                  <td className='table-td-sinchi w-16'>
                    <Image
                      src={
                        programa.imagen?.url ?? '/images/placeholder-img.jpeg'
                      }
                      alt={'Imagen destacada proyecto'}
                      width={64}
                      height={64}
                    />
                  </td>
                  <td className='table-td-sinchi w-80 text-ellipsis hover:underline'>
                    <Link href={`/admin/programa/${programa.id}`}>
                      {programa.preTitle}-{programa.name}
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>{createAtDate}</td>
                  <td className='table-td-sinchi'>{updateAtDate}</td>
                  <td className='table-td-sinchi'></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
