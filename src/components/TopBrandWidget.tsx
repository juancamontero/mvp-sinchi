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
        title='home'
        className='m-auto flex flex-row gap-3 justify-center items-center h-6 sm:h-fit'
      >
        <Image src={'/logo_nav.png'} alt={'Logo SINCHI'} height={32} width={28}/>

 
          <h1 className='text-left text-base lg:text-3xl font-semibold text-text-200'>
            {widgetTitle}
          </h1>
     
    
      </Link>

    </>
  )
}