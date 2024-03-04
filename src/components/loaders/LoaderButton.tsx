import { DOMAttributes } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { TbLoaderQuarter } from 'react-icons/tb'

export const LoaderButton = () => {
  return (
    <svg
      className='animate-spin h-6  text-bg-100 my-auto w-full'
      viewBox='0 0 16 16'
    >
      <BiLoaderAlt size={16} />
    </svg>
  )
}
