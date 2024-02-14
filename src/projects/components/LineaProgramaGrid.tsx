import Link from 'next/link'

import { IconLinea } from './LineasIcons'

interface Props {
  termino: {
    id: number
    name: string
    urlIcon: string | null
  }
  backgroundColor?:
    | 'primary-100'
    | 'primary-200'
    | 'primary-300'
    | 'accent-100'
    | 'accent-200'
    | 'text-100'
    | 'text-200'
    | 'bg-100'
    | 'bg-200'
    | 'bg-300'
  urlBase: string
  opacity?: number
}

export const LineaProgramaGrid = ({
  termino,
  opacity = 100,
  urlBase,
  backgroundColor = 'accent-100',
}: Props) => {
  if (!termino) return <h1>Término no encontrado</h1>

  return (
    <Link
      className={`flex flex-col lg:mb-0 mb-1 w-full p-2 bg-${backgroundColor} bg-opacity-${opacity}`}
      href={`${urlBase}/${termino.id}`}
    >
      <div className='flex flex-row flex-nowrap w-full gap-1 items-center justify-start'>
        <span className='mr-2'>
          <IconLinea name={termino.name} urlIcon={termino.urlIcon} size={48} />
        </span>
        <h5 className='inline-block text-bg-200 text-base font-medium leading-tight w-11/12 hover:underline'>
          {termino.name}
        </h5>
      </div>
    </Link>
  )
}
