import { TbLoaderQuarter } from 'react-icons/tb'
import styles from './Loader.module.css'

type Props = {
  message?: string

  
}

export const LoaderDefault = ({ message = 'cargando' }: Props) => {
  return (
    <div className='relative overflow-hidden  flex flex-col items-center justify-center h-dvh w-full bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-primary-100 via-bg-200 to-bg-300 m-auto'>
      <span className={styles.loader}></span>
      {/* <h2 className='text-sky-300  text-xl whitespace-normal max-w-xs text-center'>
        ... {message} ...
      </h2> */}
    </div>
  )
}