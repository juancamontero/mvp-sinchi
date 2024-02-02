import {
  LineaCarouselProjects,
  LineaCarouselProps,
} from './LineaCarouselProjects'

interface Props {
  lineas: LineaCarouselProps[]
}

export const LineasListProjectsSection = ({ lineas }: Props) => {
  return (
    <div className='w-full flex flex-col gap-2 justify-start items-start mt-6'>
      {lineas.map((linea) => (
        <LineaCarouselProjects key={linea.slug} {...linea} />
      ))}
    </div>
  )
}
