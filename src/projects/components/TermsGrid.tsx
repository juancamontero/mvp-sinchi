import Link from 'next/link'


export interface TermGridProps {
  items: {
    id: number
    name: string
  
  }[]
  urlBase: string
}

export const TermsGrid = ({items, urlBase}: TermGridProps) => {
    if (!items || items.length === 0) return <h1>Si términos</h1>
    items.sort((a, b) => a.id - b.id)
  return  (
    <>
      <div className='flex flex-row flex-wrap w-full gap-1'>
        {items.map((item) => (
          <Link
            key={item.id}
            className={`inline-block py-1 px-2 rounded-sm bg-bg-100 text-primary-200 text-xs font-medium tracking-widest cursor-pointer text-pretty shadow-sm hover:text-primary-100 hover:bg-bg-200`}
            href={`${urlBase}/${item.id}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  )
}


