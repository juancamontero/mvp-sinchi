import Link from 'next/link'
import styles from '../../Defaults.module.css'
import { Tag } from '@prisma/client'
// import { getTagsByProjectId } from '..'

type Props = {
  tags: Tag[]
}

export const TagsGrid =  ({ tags }: Props) => {


  if (!tags) return <>sin tags</>
  return (
    <>
      <div className='flex flex-row flex-wrap w-full gap-1'>
        {tags.map((tag) => (
          <Link
            key={tag.id}
            className={styles.tagsBannerProject}
            href={`/tags/${tag.id}`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </>
  )
}
