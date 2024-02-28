import Image from 'next/image'

import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { AdminSideBarItem, LogoutButton } from '../..'
import { auth } from '@/auth'
import { IoMdBook } from 'react-icons/io'

// import { LogoutButton, SidebarItem } from '..'

const sidebarItems = [
  {
    title: 'Administrador',
    path: '/admin',
    icon: <IoCalendarOutline size={30} />,
  },
  {
    title: 'Proyectos',
    path: '/admin/proyectos',
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    title: 'Palabras clave',
    path: '/admin/palabras-clave',
    icon: <IoMdBook size={30} />,
  },
  // {
  //   title: 'Server Actions',
  //   path: '/dashboard/server-todos',
  //   icon: <IoListOutline size={30} />,
  // },
  // {
  //   title: 'Cookies',
  //   path: '/dashboard/cookies',
  //   icon: <IoCodeWorkingOutline size={30} />,
  // },
  // {
  //   title: 'Products',
  //   path: '/dashboard/products',
  //   icon: <IoBasketOutline size={30} />,
  // },
  {
    title: 'Profile',
    path: '/admin/profile',
    icon: <IoPersonOutline size={30} />,
  },
]

export const AdminSidebar = async () => {
  const session = await auth()

  const name = session?.user?.name ?? 'No name'
  // TODO user Role
  const userRoles = session?.user?.roles ?? ['user']
  const urlImage = session?.user?.image ?? '/images/dummie_user.webp'
  return (
    <>
      <aside className='ml-[-100%] fixed top-20 z-10 pb-3 px-6 flex flex-col justify-between h-[85vh] border-r bg-bg-300 transition duration-300 w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
        <div>
          <div className='mt-8 text-center'>
            {/* Next/Image */}
            <Image
              src={urlImage}
              alt=''
              className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
              width={40}
              height={40}
            />
            <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
              {name}
            </h5>
            <span className='hidden text-gray-400 lg:block'>
              {userRoles.join(', ')}
            </span>
          </div>

          <ul className='space-y-2 tracking-wide mt-8'>
            {/* TODO: src/components <SidebarItem /> */}
            {sidebarItems.map((item) => (
              <AdminSideBarItem key={item.path} {...item} />
            ))}
          </ul>
        </div>

        <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
          <LogoutButton />
        </div>
      </aside>
    </>
  )
}
