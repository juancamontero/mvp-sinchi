import Image from 'next/image'
import { useContext } from 'react'
import { IoCameraOutline, IoVideocamOutline } from 'react-icons/io5'
import { MultimediaContext } from './MultimediaCarousel'
import { Multimedia } from '@prisma/client'
import { VideoBg } from '@/components'
interface Props {
  multimedia: Multimedia
}

export const MultimediaCard = ({ multimedia }: Props) => {
  const { id, mediaType: type, title, url, subTitle } = multimedia
  const { toggleGallery, getIndexById, setIndex, currentIndex } =
    useContext(MultimediaContext)

  const onMultimediaClick = () => {
    const index = getIndexById(id)
    setIndex(index)
    toggleGallery()
  }

  return (
    // * Container principal

    <div
      className={`group relative w-80 h-56 overflow-hidden rounded-sm shadow-md  hover:shadow-xl transition-shadow duration-300 ease-in-out p-2 cursor-pointer bg-cover bg-center`}
      onClick={() => onMultimediaClick()}
    >
      {/* background image */}

      {type === 'image' ? (
        <Image
          className='absolute inset-0 w-full h-full object-cover object-center'
          src={url ?? '/images/placeholder-img.jpeg'}
          width={600}
          height={450}
          alt='hero background image'
        />
      ) : (
        <VideoBg
          url={url}
          // width={300}
          // height={230}
          className='absolute inset-0 w-full h-full object-cover object-center my-auto'
        />
      )}

      {/* Overlay */}
      <div
        aria-hidden='true'
        className='absolute inset-0 w-full h-full group-hover:bg-primary-10000 group-hover:bg-opacity-40 backdrop-blur-0 group-hover:backdrop-blur-[1px]'
      />

      {/* Acá contenido que se ve sin hover */}
      <div className='relative container m-auto px-1 md:px-2 lg:px-2'>
        <div className='flex flex-col  h-full justify-start'>
          {/* year and seals starts */}
          <div className='flex flex-col lg:flex-row justify-between items-start w-full'></div>
          {/* year and seals ends */}
        </div>
      </div>
      {/* Acá termina contenido que se ve sin hover */}

      {/* Acá va el bloque que sube al hover */}
      <div className='bg-bg-100 bg-opacity-85 sm:flex sm:flex-col sm:justify-between bottom-0 inset-x-0 h-full mt-auto px-4 py-2 translate-y-28  transition duration-300 ease-in-out  absolute group-hover:bg-opacity-95 group-hover:translate-y-0'>
        {/* <TagsGrid idProject={id} /> */}

        {/* Objetivo */}
        <div className='flex flex-col justify-start items-start '>
          {/* TITLE */}
          <h2
            className={`text-base leading-[1.2] text-text-200 font-medium mt-1 line-clamp-1 group-hover:line-clamp-none group-hover:h-fit  title-italic`} //whitespace-normal truncate text-ellipsis
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subTitle && (
            <h3
              className={`text-xs leading-[1.2] text-text-200 font-medium mt-1 line-clamp-1 group-hover:line-clamp-none group-hover:h-fit  title-italic`} 
              dangerouslySetInnerHTML={{ __html: subTitle }}
            />
          )}

          {/* objetivo starts */}
          <h2 className='text-left text-2xl font-black  text-text-100 leading-none'>
            {type === 'video' ? <IoVideocamOutline /> : <IoCameraOutline />}
          </h2>

          {/* Objetivo ends*/}
        </div>
      </div>
    </div>
  )
}
