import Link from 'next/link'
// import { getProgramByProjectId } from '..'

type Props = {
  idProject: number
}
// export const ProgramasGrid = async ({ idProject }: Props) => {
export const ProgramasGrid = ({ idProject }: Props) => {
  // const program = await getProgramByProjectId(idProject)
  const program = { id: 1, name: '4. Dinámicas Socioambientales y Culturales' }

  if (!program) return <></>

  return (
    <Link
      className='flex flex-col lg:mb-0 mb-2 w-1/2 bg-bg-300 bg-opacity-60 p-2'
      href={`/programs/${program.id}`}
    >
      <h6 className='text-sm font-semibold text-slate-700 mb-1 lg:mb-2'>
        Programa de investigación
      </h6>
      <div className='flex flex-row w-full gap-1 items-center justify-start'>
        <span className='inline-block text-text-100 text-sm font-medium  cursor-pointer'>
          {program.name}
        </span>
      </div>
    </Link>
  )
}
