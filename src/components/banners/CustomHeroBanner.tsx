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
      className={`xBannerPaddings sm:py-8 py-4 mx-auto w-full  lg:py-10 bg-accent-100 `}
    >
      {/* main content starts */}
      <div className='grid gap-5 row-gap-8 sm:grid-cols-2'>
        {/* left side starts */}
        <div className='flex flex-col justify-center max-w-xl gap-2'>
          <h2 className={`titleBanner text-text-200`}>{preTitle}</h2>
          <h2 className={`titleBanner text-accent-200 `}>{title}</h2>
          <h2 className={`titleBanner text-text-100 `}>{postTitle}</h2>

          <p className='text-base text-text-200 md:text-lg'>{description}</p>
        </div>

        {/* right side starts */}
        <div className='relative sm:block hidden  my-auto'>
          <Image
            src={urlImage}
            alt='Bosque amazónico'
            width={450}
            height={400}
            className='mx-auto'
          />
        </div>
      </div>
      {/* todo: buscador */}
      {/* <div className='w-1/4 bg-bg-100 mt-2 sm:mt-4 lg:mt-6 mx-auto'>
        <h1>buscar</h1>
      </div> */}
    </div>
  )
}
