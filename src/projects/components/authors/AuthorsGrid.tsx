import { Autor } from '@prisma/client'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
// import { getAuthorsByProjectId } from '..'

type Props = {
  author: Autor | null
}

export const AuthorsGrid = ({ author }: Props) => {
  if (!author) return <h1>Sin investigador</h1>
  return (
    <>
      <Link
        className='flex flex-row flex-nowrap items-center justify-start gap-1 w-full p-2  text-bg-100  bg-primary-200 bg-opacity-90 hover:underline'
        href={`/investigador/${author.id}`}
      >
        <span className='text-bg-100'>
          <BsPerson size={48} />
        </span>
        <div className='flex flex-row flex-wrap gap-1 items-start w-11/12'>
          <div className='inline-flex items-center  hover:text-accent-100'>
            <div className='flex-grow flex flex-col'>
              <span className='text-sm font-medium hover:text-accent-100'>
                {author.name}
              </span>
              <span className='text-xs font-medium hover:text-accent-100'>
                {author.email}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
