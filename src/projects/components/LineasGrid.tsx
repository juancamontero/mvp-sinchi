import Link from 'next/link'

import { IconLinea } from './LineasIcons'
import { url } from 'inspector'

interface Props {
  linea: {
    id: number
    name: string
    urlIcon: string | null
  }
}

export const LineasGrid = async ({ linea }: Props) => {
  if (!linea) return <h1>Línea no encontrada</h1>

  return (
    <Link
      className='flex flex-col lg:mb-0 mb-2 w-full bg-accent-100 bg-opacity-80 p-2'
      href={`/linea/${linea.id}`}
    >
      <div className='flex flex-row w-full gap-1 items-center justify-start'>
        <span className=' mr-2'>
          <IconLinea name={linea.name} urlIcon={linea.urlIcon} size={78} />
        </span>
        <span className='inline-block text-bg-200 text-base font-medium  cursor-pointer'>
          {linea.name}
        </span>
      </div>
    </Link>
  )
}
