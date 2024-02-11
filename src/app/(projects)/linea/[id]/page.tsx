import { IconLinea, getLineaById } from '@/projects'

import styles from './../../../../Defaults.module.css'

interface Props {
  params: {
    id: number
  }
}

export default async function LineaPage({ params }: Props) {
  const { id } = params
  const linea = await getLineaById(Number(id))

  if (!linea) {
    return (
      <main className={`${styles.pageDefault}`}>
        <h1 className='text-3xl font-bold text-text-100 text-left mt-1 text-wrap'>
          Linea no encontrada
        </h1>
      </main>
    )
  }

  return (
    <main className={`${styles.pageDefault}`}>
      {/* banner start */}
      <div
        className={`${styles.xBannerPaddings} sticky top-0 h-fit flex flex-col flex-wrap items-start bg-bg-300 w-full py-6 gap-2`}
      >
        <span className='text-primary-200'>
          <IconLinea id={Number(id)} />
        </span>

        <h2 className='text-2xl font-semibold text-text-100 text-left mt-1 text-wrap'>
          {linea?.name}
        </h2>
        <p>{linea?.description}</p>
        <h3 className='text-xl font-semibold text-text-100 text-left mt-1 text-wrap'>
          Propósito
        </h3>
        <p>{linea?.purpose}</p>

        {/* hitos */}
        <div className='flex sm:flex-row flex-col gap-3 justify-start items-stretch w-full'>
          <div className='flex flex-col justify-start items-stretch gap-2  w-full sm:w-1/3 bg-bg-100 p-1'>            
            <h4 className='text-base font-semibold text-text-100 text-left mt-1 text-wrap'>
              Hito 1
            </h4>
            <p>{linea?.millestone1}</p>
          </div>
          <div className='flex flex-col justify-start items-stretch gap-2  w-full sm:w-1/3 bg-bg-100 p-1'>            
            <h4 className='text-base font-semibold text-text-100 text-left mt-1 text-wrap'>
              Hito 2
            </h4>
            <p>{linea?.millestone2}</p>
          </div>
          <div className='flex flex-col justify-start items-stretch gap-2  w-full sm:w-1/3 bg-bg-100 p-1'>            
            <h4 className='text-base font-semibold text-text-100 text-left mt-1 text-wrap'>
              Hito 3
            </h4>
            <p>{linea?.millestone3}</p>
          </div>
        </div>
      </div>
      {/* banner end */}
    </main>
  )
}
