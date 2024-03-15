import Link from 'next/link'

import { Region } from '@prisma/client'

type Props = {
  regions: Region[]
}

export const RegionsGrid = ({ regions }: Props) => {
  if (!regions) return <>Sin regiones</>
  return (
    <div className='flex flex-row flex-wrap items-center justify-start'>
      {regions.map((region) => (
        <Link
          href={`/region/${region.id}`}
          key={region.id}
          className='term-item'
        >
          {region.name}
          {`,`}
        </Link>
      ))}
    </div>
  )
}
