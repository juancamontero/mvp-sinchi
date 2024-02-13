import Link from 'next/link'
import { IoAddCircleOutline } from 'react-icons/io5'

interface Props {
  id: number
  projectsCount: number
  icon: React.ReactNode
  title: string
  subTitle?: string
  baseUrl: string
}

export const TermCard = ({
  id,
  projectsCount,
  icon,
  title,
  subTitle,
  baseUrl,
}: Props) => {
  if (projectsCount === 0) return <></>
  return (
    <Link
      href={`${baseUrl}/${id}`}
      className='h-48 space-y-3 bg-bg-100 p-2 rounded-sm shadow-md flex flex-row justify-start items-center hover:bg-bg-200'
      title={`Proyectos de ${title}`}
    >
      <div className='w-2/6 h-hull mx-auto text-primary-300 flex items-center justify-center p-2'>
        {icon}
      </div>
      <div className='flex flex-col justify-normal items-start w-2/3 text-left pl-1'>
        <h3 className='text-accent-200 text-6xl font-bold'>{projectsCount}</h3>
        <h4 className='text-lg text-gray-800 font-semibold'>{title}</h4>
        <h4 className='text-xs text-gray-700 font-semibold'>
          {subTitle ?? ''}
        </h4>
      </div>
    </Link>
  )
}
