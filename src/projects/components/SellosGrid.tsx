import React from 'react'

import Image from 'next/image'
import { sellosProject } from '../helpers/dataSeed'
import { Sello } from '@prisma/client'

type Props = {
  sellos: Sello[]
  selloSize?: number
}

export const SellosGrid = ({ sellos, selloSize = 42 }: Props) => {
  //todo: hacer función y traer sellos ordenados
  if (!sellos || sellos.length === 0) return <h1>Sin sellos</h1>

  return (
    <div className='flex flex-row lg:flex-nowrap flex-wrap  gap-1 items-start bg-bg-100 bg-opacity-70 p-1 w-fit'>
      {sellos.map((sello) => (
        <Image
          key={sello.url}
          src={sello.url}
          alt={sello.name}
          width={selloSize}
          height={selloSize}
        />
      ))}
    </div>
  )
}

