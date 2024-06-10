import Link from 'next/link'

export interface TermGridProps {
  items: {
    id: number
    name: string
  }[]
  urlBase?: string // solo primer slash ej:✅ '/region'  ❌ '/region/', si no se envía no tiene LINK
  className?: React.StyleHTMLAttributes<HTMLDivElement>['className']
}

export const TermsGrid = ({ items, urlBase, className='' }: TermGridProps) => {
  if (!items || items.length === 0) return <></>
  items.sort((a, b) => a.name.localeCompare(b.name))
  return (
    <>
      <div className={`flex flex-row flex-wrap items-center justify-start`}>
        {items.map((item, index) => (
          <Link
            key={item.id}
            className={`${className} ${
              urlBase
                ? ` hover:text-accent-100  hover:underline`
                : `  cursor-default`
            }`}
            href={urlBase ? `${urlBase}/${item.id}` : '#'}
          >
            {item.name}
            {index + 1 < items.length ? `, ` : ''}
          </Link>
        ))}
      </div>
    </>
  )
}
