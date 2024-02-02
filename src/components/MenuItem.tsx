'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CiGps } from 'react-icons/ci'

import styles from './MenuItem.module.css'

export interface menuItem {
  text: string
  path: string
  icon?: JSX.Element
}

export const MenuItem = ({ text, path, icon = <CiGps /> }: menuItem) => {
  const active = usePathname() === path

  return (
    <Link
      className={`flex items-center px-4 py-2 mb-4 hover:bg-bg-200 ${active?styles.activeItem : styles.noActiveItem}`}
      href={path}
    >
      <span className='w-6 h-6'>{icon}</span>
      <span className='mx-2 font-medium'>{text}</span>
    </Link>
  )
}
