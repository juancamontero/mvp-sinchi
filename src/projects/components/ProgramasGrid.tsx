import Link from 'next/link'
import { IconLinea } from '..'
// import { getProgramByProjectId } from '..'

interface Props {
  programa: {
    id: number
    name: string
    urlIcon: string | null
  }
}
// export const ProgramasGrid = async ({ idProject }: Props) => {
export const ProgramasGrid = ({ programa }: Props) => {



  if (!programa) return <>No encontrado</>

  return (
    <Link
    className='flex flex-col lg:mb-0 mb-2 w-full bg-accent-100 bg-opacity-70 p-2'
    href={`/programa/${programa.id}`}
  >
    <div className='flex flex-row w-full gap-1 items-center justify-start'>
      <span className=' mr-2'>
        <IconLinea name={programa.name} urlIcon={programa.urlIcon} size={68} />
      </span>
      <span className='inline-block text-bg-100 text-base font-medium  cursor-pointer'>
        {programa.name}
      </span>
    </div>
  </Link>
  )
}
