import Link from 'next/link'

import { Tag } from '@prisma/client'
// import { getTagsByProjectId } from '..'

type Props = {
  tags: Tag[]
}

export const TagsGrid = ({ tags }: Props) => {
  if (!tags) return <>Sin regiones</>
  return (
    <div className='flex flex-row flex-wrap items-center justify-start'>
      {tags.map((tag) => (
        <Link
          href={`/palabra-clave/${tag.id}`}
          key={tag.id}
          className='term-item'
        >
          {tag.name}
          {`,`}
        </Link>
      ))}
    </div>
  )
}
