import { auth } from '@/auth'

export default async function AdminPage() {
  const session = await auth()
  // const { user } = session

  return (
    <div>
      <h1>Admin Page</h1>
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
