import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  // const [isOpen, setIsOpen] = useState(false)

  // const onToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  return (
    <>
      <section className='w-full relative flex items-center justify-center space-x-4  lg:h-20 h-fit bg-bg-100 pt-2'>
        <div className='flex flex-row gap-2 justify-center items-stretch w-full  bg-bg-300 px-4 py-2'>
          <div className='w-10 pr-2 lg:w-auto border-r border-primary-100'>
            <Image
              src={'/logo_nav.png'}
              alt={'Logo SINCHI'}
              height={80}
              width={70}
              className='object-contain sm:object-scale-down  lg:h-20 lg:w-auto my-auto' 
            />
          </div>
          <p className='h-full w-5/6 text-[10px] sm:text-xs text-text-100 leading-tight text-center  my-auto '>
            Desarrollo: Juan Camilo Montero | Diseño: Paola Aponte | Ilustración
            e iconografía: Gilberto Aponte | Compilación contenido: Ana María
            Franco y Paola Aponte. | Oficina de comunicaciones y Subdirección
            científica Instituto SINCHI 2024, Todos los derechos reservados.
          </p>
        </div>
      </section>
    </>
  )
}
