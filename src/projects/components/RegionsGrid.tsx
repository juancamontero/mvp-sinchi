import Link from 'next/link'
import styles from '../../Defaults.module.css'
import { Region } from '@prisma/client'
// import { getRegionsByProjectId } from '..'

type Props = {
  regions: Region[]
}


export const RegionsGrid =  ({ regions }: Props) => {



  if (!regions) return <>Sin regiones</>
  return (
    <>
      <div className='flex flex-row flex-wrap w-full gap-1 justify-end items-start'>
        {regions.map((reg) => (
          <Link
            href={`/regions/${reg.id}`}
            key={reg.id}
            className={styles.tagsBannerProject}
          >
            {reg.name}
          </Link>
        ))}
      </div>
    </>
  )
}
