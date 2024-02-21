import { getAllProjects } from '@/projects'
import Link from 'next/link'

export default async function AdminProjectsPage() {
  const proyectos = await getAllProjects()
  return (
    <>
      <h1 className='font-bold text-2xl'>Proyectos</h1>
      <hr />
      <div className="flex justify-end mt-5">
        <Link href="/admin/proyecto/new" className="btn-primary">
          Nuevo proyecto
        </Link>
      </div>
    </>
  )
}
