import Image from 'next/image'
import Link from 'next/link'
import { GoProjectRoadmap } from 'react-icons/go'

interface Props {
  widgetTitle?: string
  title?: string
  baseUrl?: string
}

export const TopBrandWidget = ({
  widgetTitle = ' SINCHI | Proyectos',
  baseUrl = '/',
}: Props) => {
  return (
    <>
      <Link
        href={baseUrl}
        title='ir al inicio'
        className='m-auto flex flex-row gap-3 justify-center items-center h-6 sm:h-fit'
      >
        <Image
          src={'/logo_nav.png'}
          alt={'Logo SINCHI'}
          height={42}
          width={28}
        />

        <h1 className='text-left text-base lg:text-3xl font-light text-primary-100 leading-tight tracking-tight'>
          Instituto{' '}
          <span className='text-primary-200 font-semibold'>SINCHI </span>
          <span className='sm:border-l sm:border-primary-100 text-accent-100 sm:pl-1 pl-0 border-l-0 leading-none'>
            Proyectos
          </span>
        </h1>
      </Link>
    </>
  )
}
