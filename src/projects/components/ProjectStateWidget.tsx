import Image from 'next/image'
type Props = {
  completed: boolean
  selloSize?: number
}
export const ProjectStateWidget = ({ completed,  selloSize = 48 }: Props) => {
  return (
    <div className='flex flex-row flex-wrap 
    items-start bg-bg-100 p-1 w-fit'>
      <Image
     
          src={completed? '/images/sellos/terminado.webp': '/images/sellos/no-terminado.webp'}
          alt='estado del proyecto'
          width={selloSize}
          height={selloSize}
        />
    </div>
  )
}
