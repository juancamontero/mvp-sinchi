import Link from 'next/link'
// import { getProgramByProjectId } from '..'

type Props = {
  programa: {
    id: number,
    name: string,
  }
}
// export const ProgramasGrid = async ({ idProject }: Props) => {
export const ProgramasGrid = ({ programa }: Props) => {



  if (!programa) return <>No encontrado</>

  return (
    <Link
      className='flex flex-col lg:mb-0 mb-2 sm:w-1/2 w-full bg-bg-300 bg-opacity-60 p-2'
      href={`/programa/${programa.id}`}
    >
      <h6 className='text-sm font-semibold text-slate-700 mb-1 lg:mb-2'>
        Programa de investigación
      </h6>
      <div className='flex flex-row w-full gap-1 items-center justify-start'>
        <span className='inline-block text-text-100 text-sm font-medium  cursor-pointer'>
          {programa.name}
        </span>
      </div>
    </Link>
  )
}
