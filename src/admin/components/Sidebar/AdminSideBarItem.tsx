'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'


interface Props {
  icon: React.ReactNode
  title: string
  path: string
}

export const AdminSideBarItem = ({ title, path, icon }: Props) => {
  const pathName = usePathname()

  return (
    <>
      {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
      <li>
        <Link
          href={path}
          className={`p-2 text-sm flex items-center space-x-2 rounded-e-sm text-text-200 group
            hover:bg-gradient-to-r hover:bg-text-200 hover:text-white
            ${
              pathName === path
                ? `relative p-2   flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-text-200 to-primary-200`
                : ''
            }`}
        >
          {icon}
          <span className='-mr-1 font-medium'>{title}</span>
        </Link>
      </li>
    </>
  )
}
