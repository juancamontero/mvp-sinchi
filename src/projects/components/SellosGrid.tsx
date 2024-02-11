import React from 'react'

import Image from 'next/image'
import { sellosProject } from '../helpers/dataSeed'
import { Sello } from '@prisma/client'

type Props = {
  sellos: Sello[]
  selloSize?: number
}

export const SellosGrid = ({ sellos, selloSize = 48 }: Props) => {
  //todo: hacer función y traer sellos ordenados
  if (!sellos || sellos.length === 0) return <h1>Sin sellos</h1>

  return (
    <div className='flex flex-row flex-wrap  gap-1 items-start bg-bg-100 p-1'>
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

const test = (
  <ul>
    <li>
      Protocolo de articulaci&oacute;n t&eacute;cnica de los{' '}
      <strong>sistemas de monitoreo</strong> de bosques y coberturas existente,
      validado e incorporado como soporte de la continuidad en la
      operaci&oacute;n de SMBYC, SIATAC y SIGEA de autoridades ambientales
    </li>
    <li>
      Transferencia de Modelo de intervenci&oacute;n para Acuerdos de
      conservaci&oacute;n, restauraci&oacute;n y no deforestaci&oacute;n con
      productores rurales
    </li>
    <li>
      Acciones de conservaci&oacute;n y manejo de especies amenazadas de flora,
      fauna terrestre y fauna acu&aacute;tica, que contribuyan a la
      conectividad, en implementaci&oacute;n
    </li>
  </ul>
)
