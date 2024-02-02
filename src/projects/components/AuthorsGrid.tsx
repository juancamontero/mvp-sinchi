import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
// import { getAuthorsByProjectId } from '..'

type Props = {
  idProject: number
}

// export const AuthorsGrid = async ({ idProject }: Props) => {
export const AuthorsGrid = ({ idProject }: Props) => {
  // const authors = await getAuthorsByProjectId(idProject)

  const authors = [{ id: 1, name: 'Juan Montero', email: 'juan@juan.com' }]

  return (
    <>
      <div className='flex flex-row flex-nowrap items-start justify-between gap-1'>
        <span className='text-text-100'>
          <BsPerson size={48} />
        </span>
        <div className='flex flex-row flex-wrap gap-1 items-start'>
          {authors.map((author) => (
            <Link
              className='inline-flex items-center hover:text-blue-600'
              href={`/users/${author.id}`}
              key={author.id}
            >
              <div className='flex-grow flex flex-col pl-4'>
                <span className='text-sm font-medium text-text-100  hover:text-primary-200'>
                  {author.name}
                </span>
                <span className='text-xs font-medium text-text-200  hover:text-primary-100'>
                  {author.email}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
