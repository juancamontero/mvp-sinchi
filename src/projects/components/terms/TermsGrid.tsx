import Link from 'next/link'


export interface TermGridProps {
  items: {
    id: number
    name: string
  
  }[]
  urlBase: string // solo primer slash ej:✅ '/region'  ❌ '/region/'
}

export const TermsGrid = ({items, urlBase}: TermGridProps) => {
    if (!items || items.length === 0) return <></>
    items.sort((a, b) => a.name.localeCompare(b.name))
  return  (
    <>
      <div className='flex flex-row flex-wrap items-center justify-start'>
        {items.map((item, index) => (
          <Link
            key={item.id}
            className={`mr-2 leading-none text-xl hover:text-accent-100 pt-1 hover:underline`}
            href={`${urlBase}/${item.id}`}
          >
            {item.name}{index+1<items.length?(`, `):('')}
          </Link>
        ))}
      </div>
    </>
  )
}


