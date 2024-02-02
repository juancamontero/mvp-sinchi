import Link from 'next/link'
import styles from '../../Defaults.module.css'
// import { getConveniosByProjectId } from '..'

type Props = {
  idProject: number
}
// export const ConveniosGrid = async ({ idProject }: Props) => {
export const ConveniosGrid =  ({ idProject }: Props) => {
  // const convenios = await getConveniosByProjectId(idProject)

  
  const convenios = [
    {id: 1, name: "Banco Mundial"},
    {id: 2, name: "MiniTic"},
    {id: 1, name: "PNUD"},
  ]
  
  if (!convenios) return <></>
  return (
    <div className='flex flex-col lg:mb-0 mb-2 bg-bg-300 bg-opacity-60 p-2 w-full' >
      <h6 className='text-sm font-semibold text-slate-700 mb-1 lg:mb-2'>Convenios</h6>
      <div className='flex flex-row flex-wrap w-full gap-1 items-start'>
        {convenios.map((conv) => (
          <Link
            href={`/convenios/${conv.id}`}
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
