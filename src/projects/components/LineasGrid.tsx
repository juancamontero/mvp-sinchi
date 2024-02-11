import Link from 'next/link'
import { getLineaByProyectoId } from '..'
import { IconLinea } from './LineasIcons'

interface Props {
  linea: {
    id: number,
    name: string,
  }
}

export const LineasGrid = async ({ linea }: Props) => {
 
  if (!linea) return <h1>Línea no encontrada</h1>

  return (
    <Link
      className='flex flex-col lg:mb-0 mb-2 sm:w-1/2 w-full bg-bg-300 bg-opacity-60 p-2'
      href={`/linea/${linea.id}`}
    >
      <h6 className='text-sm font-semibold text-slate-700 mb-1 lg:mb-2'>
        Línea de investigación
      </h6>
      <div className='flex flex-row w-full gap-1 items-center justify-start'>
        <span className='text-primary-200 h-8 w-8'>
          <IconLinea id={linea.id} />
        </span>
        <span className='inline-block text-text-100 text-sm font-medium  cursor-pointer'>
          {linea.name}
        </span>
      </div>
    </Link>
  )
}
