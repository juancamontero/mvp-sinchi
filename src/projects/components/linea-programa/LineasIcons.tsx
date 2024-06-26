import Image from 'next/image'

const ICON_SIZE = 72

interface Props {
  urlIcon?: string | null
  size?: number
  name?: string
}
export const IconLinea = ({
  name = 'Línea  de investigación',
  urlIcon,
  size = ICON_SIZE,
}: Props) => {
  const urlImage = urlIcon ? urlIcon : '/images/placeholder-img.jpeg'

  return (
    <div className='sm:w-24 sm:h-24 w-20 h-20'>
      <Image
        src={urlImage}
        alt={name}
        width={120}
        height={120}
        className='object-center object-cover'
      />
    </div>
  )
}
