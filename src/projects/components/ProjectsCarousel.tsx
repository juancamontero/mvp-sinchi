import { ProjectCard } from ".."

const dummieCards = [1, 2, 3, 4, 5, 6, 7, 8]

interface ProyectosDummie {
  id: number
  name: string
  idLinea: number
}

interface Props {
  proyectos: ProyectosDummie[]
}
export const ProjectsCarousel = ({proyectos}: Props) => {

  if (proyectos.length === 0) return <h1>No hay proyectos para esa línea</h1>
  return (
    <>
      <div className='mt-6 overflow-x-scroll w-full mx-auto snap-x snap-mandatory p-2 shadow-inner'>
        <div className='flex flex-row flex-nowrap gap-5 mt-6 mb-8 w-fit'>

          {proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} {...proyecto} />
          ))}

        </div>
      </div>
    </>
  )
}
