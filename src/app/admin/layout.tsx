import { AdminSidebar, AdminTopMenu } from '@/admin'
import { auth } from '@/auth'
import AuthProvider from '@/auth/components/AuthProvider'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <>
      <AuthProvider>
        <AdminSidebar />
        <div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen'>
          <AdminTopMenu />
          <div className='px-6 pt-6 bg-white p-2 m-2 rounded pb-5'>
            {children}
          </div>
        </div>
      </AuthProvider>
    </>
  )
}
