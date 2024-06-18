'use client'
import Image from 'next/image'
import Link from 'next/link'

export interface Term {
  id: number
  name: string
  count: number
  imageUrl?: string
}
interface Props {
  terms: Term[]
  baseUrl: string
}

export const TermsCountBars = ({ terms, baseUrl }: Props) => {
  // to calculate the max count of proyectos for scaling the bars with flex-grow
  const maxProyectoCount = Math.max(...terms.map((term) => term.count))

  // todo: Animate bars
  return (
    <div className='flex flex-col justify-start items-center gap-2 mt-2 w-full p-2 bg-bg-300'>
      {terms.map((term) => {
        if (term.count === 0) return

        const titleContent = (
          <div className='flex flex-col justify-start items-start ml-1 w-32 lg:w-1/3 h-fit my-auto'>
            {term.imageUrl && (
              <div className='p-1'>
                <Image
                  src={term.imageUrl}
                  width={75}
                  height={75}
                  className='max-h-10 w-auto object-cover p-0'
                  alt={term.name}
                />
              </div>
            )}
            <p
              className={` text-text-100 text-left content-center my-auto whitespace-normal truncate text-ellipsis ${
                term.imageUrl
                  ? 'text-[10px] leading-tight h-6'
                  : 'lg:text-base text-xs'
              }`}
            >
              {term.name}
            </p>
          </div>
        )
        const currentFlexGrow = term.count / maxProyectoCount
        return (
          <Link
            key={term.id}
            href={`${baseUrl}/${term.id}`}
            className='group flex flex-row w-full p-1 justify-between gap-3 lg:gap-10  items-stretch hover:bg-bg-400 bg-bg-100 px-2'
            title='ver proyectos'
          >
            {titleContent}
            <div className='flex flex-row justify-end lg:w-full w-2/3 my-auto'>
              <p
                className={`lg:h-8 h-6 text-xs bg-primary-100  content-center text-right pr-2 text-bg-150 group-hover:bg-primary-200  my-auto rounded flex-grow`}
                style={{ flexGrow: currentFlexGrow }}
              >{`${term.count}`}</p>
            </div>
            <p className=' text-[10px] lg:text-xs font-extralight text-primary-100 lg:p-1 text-center content-center group-hover:text-text-100 group-hover:font-normal'>
              ver proyectos
            </p>
          </Link>
        )
      })}
    </div>
  )
}
