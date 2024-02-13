import Image from 'next/image'

import styles from '../Defaults.module.css'

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
      className={`${styles.xBannerPaddings} sm:py-8 py-4 mx-auto w-full  lg:py-10 bg-accent-100 `}
    >
      {/* main content starts */}
      <div className='grid gap-5 row-gap-8 sm:grid-cols-2'>
        {/* left side starts */}
        <div className='flex flex-col justify-center'>
          <div className='max-w-xl'>
            <h2 className='text-6xl text-text-100 font-black'>{preTitle}</h2>
            <h2 className={`${styles.titleBanner}`}>
              <span className='text-accent-200'>{title}</span>
            </h2>
            <h3 className='text-text-100 text-base font-bold mt-1'>
              {postTitle}
            </h3>
            <p className='text-base text-text-200 md:text-lg'>{description}</p>
          </div>
        </div>

        {/* right side starts */}
        <div className='relative sm:block hidden  my-auto'>
          <Image
            src='/images/home-banner.png'
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
