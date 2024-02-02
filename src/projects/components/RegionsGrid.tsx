import Link from 'next/link'
import styles from '../../Defaults.module.css'
// import { getRegionsByProjectId } from '..'

type Props = {
  idProject: number
}

// export const RegionsGrid = async ({ idProject }: Props) => {
export const RegionsGrid =  ({ idProject }: Props) => {
  // const regions = await getRegionsByProjectId(idProject)
  const regions =  [
    {id: 1, name: "Amazonas"},
    {id: 2, name: "Bogotá"},
  ]

  if (!regions) return <></>
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
