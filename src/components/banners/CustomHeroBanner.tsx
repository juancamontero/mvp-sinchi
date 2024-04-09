import Image from 'next/image'

interface Props {
  title: string
  preTitle?: string
  postTitle?: string
  description?: string
  urlImage?: string
}

export const CustomHeroBanner = ({
  title,
  preTitle = '',
  postTitle = '',
  description = '',
  urlImage = '/images/home-banner.png',
}: Props) => {
  return (
    <div
      className={`py-2 mx-auto w-full  bg-bg-300 my-1`}
    >
      {/* main content starts */}

      <div className='flex flex-col justify-center items-center'>
        <div className='rounded-full bg-bg-100 w-24 h-24 p-1 flex flex-col justify-center items-center'>
          <Image
            src='/logo_nav.png'
            alt='Logo instituto SINCHI'
            width={48}
            height={48}
            className='m-auto'
          />
        </div>
        <div className='max-w-xl'>
          <h2 className={`titleBanner text-center text-primary-200 leading-none mt-1`}>
          {preTitle}{` `}{title}
          </h2>
          <h3 className='text-base text-text-100 text-center font-light leading-tight mt-2'>
            {postTitle}
          </h3>
        </div>
      </div>

      {/* rounded logo starts*/}

      {/* todo: buscador */}
      {/* <div className='w-1/4 bg-bg-100 mt-2 sm:mt-4 lg:mt-6 mx-auto'>
        <h1>buscar</h1>
      </div> */}
    </div>
  )
}
