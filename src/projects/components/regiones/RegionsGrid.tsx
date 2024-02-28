import Link from 'next/link'

import { Region } from '@prisma/client'
import { TermsGrid } from '../..'
// import { getRegionsByProjectId } from '..'

type Props = {
  regions: Region[]
  places: string
}

export const RegionsGrid = ({ regions, places }: Props) => {
  if (!regions) return <>Sin regiones</>
  return (
    <>
      <div className='flex flex-col mb-0 bg-primary-100 bg-opacity-80 p-2 w-full'>
        <div className='flex flex-row flex-wrap w-full gap-1 items-start'>
          <TermsGrid items={regions} urlBase={'/region'} />
        </div>
        <p className='w-full text-bg-100 mt-1 text-sm'>{places}</p>
      </div>
    </>
  )
}
