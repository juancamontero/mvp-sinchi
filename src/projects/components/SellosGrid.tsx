import React from 'react'

import Image from 'next/image'
import { sellosProject } from '../helpers/dataSeed'

type Props = {
  idProject: number
  selloSize?: number
}

export const SellosGrid = ({ idProject, selloSize = 48 }: Props) => {
  //todo: hacer función y traer sellos ordenados
  //const sellosProject = getSellosByProjectId()
  return (
    <div className='flex flex-row flex-wrap  gap-1 items-start bg-bg-100 p-1'>
      {sellosProject.map((sello) => (
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
