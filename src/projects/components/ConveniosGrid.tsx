import Link from 'next/link'
import styles from '../../Defaults.module.css'
import { Convenio } from '@prisma/client'
// import { getConveniosByProjectId } from '..'

type Props = {
  convenios: Convenio[]
}
// export const ConveniosGrid = async ({ idProject }: Props) => {
export const ConveniosGrid = ({ convenios }: Props) => {
  // const convenios = await getConveniosByProjectId(idProject)

  if (!convenios) return <>Sin convenios</>
  return (
    <div className='flex flex-col lg:mb-0 mb-2 bg-bg-300 bg-opacity-60 p-2 w-full'>
      <h6 className='text-sm font-semibold text-slate-700 mb-1 lg:mb-2'>
        Convenios
      </h6>
      <div className='flex flex-row flex-wrap w-full gap-1 items-start'>
        {convenios.map((conv) => (
          <Link
            href={`/convenio/${conv.id}`}
            key={conv.id}
            className={styles.tagsBannerProject}
          >
            {conv.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
