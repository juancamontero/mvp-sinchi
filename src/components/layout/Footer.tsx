import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  // const [isOpen, setIsOpen] = useState(false)

  // const onToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  return (
    <>
      <section className='w-full mt-1 relative px-4 flex items-center justify-center space-x-4  lg:h-20 h-28 bg-bg-300'>
        <div className='flex flex-row gap-2 justify-center items-stretch w-full lg:py-2'>
          <div className='w-1/6 '>
            <Image
              src={'/logo_nav.png'}
              alt={'Logo SINCHI'}
              height={80}
              width={70}
              className='object-contain sm:object-scale-down  lg:h-20 lg:w-auto'
            />
          </div>
          <p className=' w-5/6 text-[10px] sm:text-xs text-text-200 leading-tight text-center max-w-xl border-l border-text-100 pl-2 my-auto'>
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
