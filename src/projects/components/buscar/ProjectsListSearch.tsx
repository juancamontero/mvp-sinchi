'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

interface Proyecto {
  id: number
  name: string
  imageUrl: string | undefined
}

interface Props {
  proyectos: Proyecto[]
}

export const ProjectsListSearch = ({ proyectos }: Props) => {
  const [currentProjects, setCurrentProjects] = useState<Proyecto[]>([])

  useEffect(() => {
    setCurrentProjects([...proyectos])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchTerm = (searchText: string | undefined) => {
    if (searchText && searchText?.length > 3) {
      const newArray = proyectos.filter((proyecto) =>
        proyecto.name.toLowerCase().includes(searchText.toLowerCase())
      )
      setCurrentProjects(newArray)
    } else {
      setCurrentProjects(proyectos)
    }
  }

  const debounceRef = useRef<NodeJS.Timeout>()
  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    // * Primero limpio el debouce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    // * Luego creo el timeout
    debounceRef.current = setTimeout(() => {
      // todo: buscar o consultar

      searchTerm(event.target.value)
    }, 350)
  }
  return (
    <section className='w-full flex flex-col justify-start items-center h-[40vh] overflow-y-auto bg-bg-300 p-4 pt-0'>
      <div className='sticky top-0 z-10 flex flex-row gap-2 justify-center items-center w-full bg-bg-300 py-2'>
        {/* <label htmlFor="searchText" className='text-xs text-text-100'>Buscar</label> */}
        <input
          type='text'
          name='searchText'
          id=''
          placeholder='buscar'
          className='bg-bg-100 w-5/6 text-center text-xs h-8 rounded-sm shadow-inner'
          onChange={onQueryChange}
        />
      </div>

      <table className='relative w-full border bg-bg-300'>
        <thead className='table-auto table-header-group'>
          <tr className='table-row text-xs font-medium'>
            <th scope='col' className='w-5 py-4'>
              
            </th>
            <th scope='col' className='lg:w-28 w-20'>
              No. del proyecto
            </th>

            <th scope='col' className='border-l text-left p-2'>
              Nombre del proyecto
            </th>
          </tr>
        </thead>

        <tbody>
          {currentProjects.map((proyecto) => (
            <tr
              key={proyecto.id}
              className='bg-bg-150 hover:bg-bg-400 border-b'
            >
              <td className=''>
                <Link href={`/proyecto/${proyecto.id}`}>
                  <p className='text-xs  text-text-100  text-center w-full'>
                    {proyecto.id}
                  </p>
                </Link>
              </td>
              <td className='table-cell py-2'>
                <Link href={`/proyecto/${proyecto.id}`} >
                  <Image
                    width={300}
                    height={300}
                    className='h-16 w-16  object-cover m-auto object-center rounded-full'
                    src={proyecto.imageUrl ?? '/images/placeholder-img.jpeg'}
                    alt='Imagen destacada del proyecto'
                  />
                </Link>
              </td>
              <td className='table-cell p-2 border-l border-bg-400'>
                <Link href={`/proyecto/${proyecto.id}`}>
                  <h3 className='text-xs text-wrap text-text-100 text-ellipsis leading-snug'>
                    {proyecto.name}
                  </h3>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
