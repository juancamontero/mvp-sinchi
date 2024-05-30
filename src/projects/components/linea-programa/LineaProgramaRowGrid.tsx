import Image from 'next/image'
import Link from 'next/link'

export interface LineaProgramaGridTerm {
  id: number
  name: string
  imageUrl: string | undefined
}
interface Props {
  terms: LineaProgramaGridTerm[]
  baseUrl: string
}

export const LineaProgramaRowGrid = ({ terms, baseUrl }: Props) => {
  return (

      <div className='flex flex-row flex-wrap  lg:gap-4 justify-evenly items-stretch my-auto mt-2'>
        {terms.map((term) => {
          return (
            <Link
              key={term.id}
              className='flex flex-col justify-start items-center lg:mt-0  lg:w-40 sm:w-1/3 w-full mt-2'
              href={`/${baseUrl}/${term.id}`}
            >
              <Image
                src={term.imageUrl ?? ''}
                alt={term.name}
                width={160}
                height={160}
                className='lg:my-1 p-1 lg:h-20 lg:w-20 w-16 h-16 object-contain '
              />
              <h3 
              className='text-center text-sm leading-snug text-text-100 lg:mt-5 mt-1 font-light hover:text-accent-100'
              >
                {term.name}
              </h3>
            </Link>
          )
        })}
      </div>

  )
}
