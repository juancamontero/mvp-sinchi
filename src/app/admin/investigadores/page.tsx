import Link from 'next/link'
import Image from 'next/image'

import { getAllInvestigadoresForm, getAllProgramasForm } from '@/actions'
import { TitleAdmin } from '@/admin'

export const metadata = {
  title: 'Investigadores | Administración',
  description: 'Lista de investigadores | Administración',
}

export default async function AdminInvestigadoresPage() {
  const investigadores = await getAllInvestigadoresForm()

  return (
    <div className='pageDefault w-full'>
      <TitleAdmin
        title='Edición / Eliminación de investigadores'
        subTitle='Click sobre nombre programa para editar'
      />
      <hr />
      <div className='flex flex-row justify-end my-4 w-full'>
        <Link href='/admin/investigador/new' className='btn-primary'>
          Nuevo investigador
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
                Nombre
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Número de proyectos
              </th>
              <th scope='col' className='table-th-header-sinchi'>
                Email
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
            {investigadores.map((investigador) => {
              const createAtDate = new Date(
                investigador.createAt ?? 0
              ).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              const updateAtDate = new Date(
                investigador.updateAt ?? 0
              ).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })

              return (
                <tr key={investigador.id} className='row-tabla-sinchi '>
                  <td className='table-td-sinchi'>{investigador.id}</td>

                  <td className='table-td-sinchi w-80 text-ellipsis hover:underline'>
                    <Link href={`/admin/investigador/${investigador.id}`}>
                      {investigador.name}
                    </Link>
                  </td>
                  <td className='table-td-sinchi'>{investigador._count.Proyecto}</td>
                  <td className='table-td-sinchi'>{investigador.email}</td>
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
