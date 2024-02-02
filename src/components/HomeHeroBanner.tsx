import Image from 'next/image'

import styles from '../Defaults.module.css'

export const HomeHeroBanner = () => {
  return (
    <div className={`${styles.xBannerPaddings} sm:py-8 py-4 mx-auto w-full  lg:py-10 bg-accent-100 `}>

        {/* main content starts */}
      <div className='grid gap-5 row-gap-8 sm:grid-cols-2'>
        {/* left side starts */}
        <div className='flex flex-col justify-center'>
          <div className='max-w-xl mb-6'>
          
            <h2 className={styles.titleBanner}>
              Conozca los proyectos del {' '}
              <span className='inline-block text-accent-200'>
                 SINCHI
              </span>
            </h2>
            <p className='text-base text-text-200 md:text-lg'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae. explicabo.
            </p>
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
