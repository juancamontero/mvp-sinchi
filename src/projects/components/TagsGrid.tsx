import Link from 'next/link'
import styles from '../../Defaults.module.css'
// import { getTagsByProjectId } from '..'

type Props = {
  idProject: number
}
// export const TagsGrid = async ({ idProject }: Props) => {
export const TagsGrid =  ({ idProject }: Props) => {
  // const tags = await getTagsByProjectId(idProject)
  const tags = [
    {id: 1, name: "Ecosistema"},
    {id: 2, name: "Plantas"},
    {id: 3, name: "Recursos naturales"},
  ]

  if (!tags) return <></>
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
