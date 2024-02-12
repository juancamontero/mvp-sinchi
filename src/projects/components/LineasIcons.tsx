import Image from 'next/image'

const ICON_SIZE = 40

interface Props {
  urlIcon?: string | null
  size?: number
  name?: string
}
export const IconLinea = ({
  name = 'Línea  de investigación',
  urlIcon = '/images/lineas/linea-1.webp',
  size = ICON_SIZE,
}: Props) => {

const urlImage = urlIcon ? urlIcon : '/images/lineas/linea-1.webp'

  return <Image src={urlImage} alt={name} width={size} height={size} className='mb-1'/>
}
