import { auth } from '@/auth'

export function generateMetadata() {
  return {
    title: `ADMIN | Proyectos SINCHI`,
    description: `Administración de proyectos`,
  }
}

export default async function AdminPage() {
  const session = await auth()
  // const { user } = session

  return (
    <div>
      <h1 className='font-bold text-2xl'>Admin page</h1>
      <hr />
      <div className='grid gap-6 md:grid-cols-2 grid-cols-1'>
        <div className='flex flex-col'>
          <span>{session?.user?.name}</span>
          <span>{session?.user?.email}</span>
          <span>{session?.user?.image}</span>
        </div>
      </div>
    </div>
  )
}
