import Image from 'next/image'

import { SelloArray } from '@/projects'

type Props = {
  sellos: SelloArray[]
}

export const SellosRow = ({ sellos }: Props) => {
  //todo: hacer función y traer sellos ordenados
  if (!sellos || sellos.length === 0) return <h1>Sin sellos</h1>

  return (
    <div className='flex flex-row flex-wrap  gap-1 justify-evenly items-stretch my-auto'>
      {sellos.map((sello) => (
        <div key={`${sello.id}`} className='flex flex-col justify-start items-center lg:mt-0 mt-10 lg:w-40 sm:w-1/3 w-full'>
          <Image
            src={sello.imageUrl ?? '/images/placeholder-img.jpeg'}
            alt={sello.title}
            width={320}
            height={320}
            className='h-24 w-24'
          />
          <h3 className='text-center text-sm leading-snug text-text-50 mt-5 font-light'>
            {sello.title}
          </h3>
        </div>
      ))}
    </div>
  )
}
