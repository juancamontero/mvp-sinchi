import Image from 'next/image'

import styles from '../Defaults.module.css'


interface Props {
  title: string
  subTitle: string
}

export const HomeHeroBanner = ({title, subTitle}: Props) => {

  return (
    <div
      className={`${styles.xBannerPaddings} sm:py-3 py-2 mx-auto w-full lg:py-4 bg-bg-300 my-1`}
    >
      {/* main content starts */}

      <div className='flex flex-col justify-center items-center'>
        <div className='rounded-full bg-bg-100 w-20 h-20 p-3 flex flex-col justify-center items-center'>
          <Image
            src='/logo_nav.png'
            alt='Logo instituto SINCHI'
            width={48}
            height={48}
            className='m-auto w-auto h-14'
          />
        </div>
        <div className='max-w-xl'>
          <h2 className={`${styles.titleBanner} text-center text-primary-200`}>
            {title}
          </h2>
          <h3 className='text-base text-text-100 text-center font-light'>
            {subTitle}
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
