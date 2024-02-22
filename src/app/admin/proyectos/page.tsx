import { getAllProjects } from '@/projects'
import Link from 'next/link'

export default async function AdminProjectsPage() {
  const proyectos = await getAllProjects()
  return (
    <div className='max-w-full'>
      <h1 className='font-bold text-2xl'>Mantenimiento de proyectos</h1>
      <hr />
      <div className='flex justify-end my-4'>
        <Link href='/admin/proyecto/new' className='btn-primary'>
          Nuevo proyecto
        </Link>
      </div>

      {/* table  */}

      <div className='mt-4 w-full overflow-hidden border border-gray-200'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead className='table-sinchi-head'>
            <tr>
              <th scope='col' className='table-th-header-sinchi'>
                id
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
              return (
                <tr key={proyecto.id} className='row-tabla-sinchi'>
                  <td className='table-td-sinchi'>{proyecto.id}</td>
                  <td className='table-td-sinchi'>{proyecto.name}</td>
                  <td className='table-td-sinchi'>{proyecto.year}</td>
                  <td className='table-td-sinchi'>{proyecto.linea?.name}</td>
                  <td className='table-td-sinchi'>{proyecto.programa?.name}</td>
                  <td className='table-td-sinchi'>{createAtDate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
