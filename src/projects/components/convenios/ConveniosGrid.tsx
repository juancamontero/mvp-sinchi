import Link from 'next/link'

import { Convenio } from '@prisma/client'
import { TermsGrid } from '../..'
// import { getConveniosByProjectId } from '..'

type Props = {
  convenios: Convenio[]
}
// export const ConveniosGrid = async ({ idProject }: Props) => {
export const ConveniosGrid = ({ convenios }: Props) => {
  // const convenios = await getConveniosByProjectId(idProject)

  if (!convenios) return <>Sin convenios</>
  return (
    <div className='flex flex-col lg:mb-0 mb-2 bg-accent-100 bg-opacity-80 p-2 w-full'>
      <h6 className='text-sm font-semibold text-white mb-1 lg:mb-2'>
        Convenios
      </h6>
      <div className='flex flex-row flex-wrap w-full gap-1 items-start'>
        <TermsGrid items={convenios} urlBase={'/convenio'} />
 
      </div>
    </div>
  )
}
