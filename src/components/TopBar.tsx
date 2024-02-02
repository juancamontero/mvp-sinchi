'use client'

import { useState } from 'react'

import {  CiSearch } from 'react-icons/ci'
import { TopBrandWidget, VerticalMenu } from '.'
import { IoCloseSharp,  IoPersonOutline } from 'react-icons/io5'
import { GiArchiveResearch, GiHamburgerMenu } from 'react-icons/gi'
import { GoHome } from 'react-icons/go'
import { IoMdBook } from 'react-icons/io'
import { PiHandshakeLight } from 'react-icons/pi'
import { TbWorldPin } from 'react-icons/tb'
import Link from 'next/link'

const menuItems = [
  { text: 'Inicio', path: '/', icon: <GoHome /> },
  { text: 'Líneas de investigación', path: '/lineas', icon: <GiArchiveResearch /> },
  { text: 'Investigadores', path: '/investigadores', icon: <IoPersonOutline />},
  { text: 'Regiones', path: '/regiones', icon: <TbWorldPin />},
  { text: 'Programas / Asociados', path: '/programas', icon: <PiHandshakeLight /> },
  { text: 'Glosario', path: '/glosario', icon: <IoMdBook />  },
]

export const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className='sticky z-10 top-0 h-16 border-b bg-bg-100 '>
        <div className='px-6 flex items-center justify-between space-x-4'>

          {/* Hamburger menu starts */}
          <button 
          className='w-12 h-16 text-text-100 hover:text-primary-300'
          onClick={onToggle}
          >
            <GiHamburgerMenu size={28} />
          </button>

          <TopBrandWidget />

          {/* right side starts */}
          <div className='flex space-x-2'>
            

            <Link href='/search' className='flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200' title='Buscador'>
              <CiSearch />
            </Link>
            
          </div>
          {/* right side ends */}
        </div>
        {/* vertical menu here */}
        <aside className={`absolute top-0 flex flex-col justify-start items-center w-64 h-screen px-3 py-8 overflow-y-auto bg-white bg-opacity-90 shadow-md transition-all duration-500 ${!isOpen? '-ml-[100%]': ''}`} onClick={onToggle}>
          {/* Close button */}
          <button className='text-text-100 hover:text-accent-200 mt-2 mb-6' onClick={onToggle}>
            <IoCloseSharp size={36} className='m-auto' />
          </button>
          <VerticalMenu menuItems={menuItems} />
        </aside>
      </div>
    </>
  )
}
