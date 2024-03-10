import { getProyectoById } from '@/actions'
import {
  ProjectBanner,
  ProyectosProductHtml,
  createSellosArray,
} from '@/projects'

interface Props {
  params: {
    id: number
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = params
  const proyecto = await getProyectoById(Number(id))

  if (!proyecto) return <>No encontrado</>

  const sellosArray = createSellosArray({
    linea: proyecto.linea,
    programa: proyecto.programa,
    sellos: proyecto.sellos,
  })

  return (
    <main className={`flex-1 w-full relative overflow-y-auto`}>
    {/* <main className={`projectPage relative h-full`}> */}
      {/* banner start */}
      <ProjectBanner
        urlBackground={proyecto.imagen?.url}
        year={proyecto.year}
        sellos={proyecto.sellos}
        completed={proyecto.completed}
        name={proyecto.name}
        tags={proyecto.tags}
        linea={proyecto.linea}
        programa={proyecto.programa}
        convenios={proyecto.convenios}
        regiones={proyecto.regions}
        places={proyecto.places ?? ''}
        autor={proyecto.autor}
        roleInvestigador={proyecto.roleInvestigador}
        equipo={proyecto.equipo}
        sellosArray={sellosArray}
      />

      {/* ANTECEDENTES START*/}
      <div
        className={`xBannerPaddings sticky top-0 h-screen flex flex-col items-center justify-center bg-bg-200  gap-8 w-full`}
      >
        <div className='flex flex-col justify-center items-center  p-4 gap-4'>
          <h2 className='text-4xl font-bold text-primary-200 mb-2 text-center'>
            Antecedentes
          </h2>
          {/* <p>{proyecto.objetivo}</p> */}
          {proyecto.antecedentes && (
            <div
              dangerouslySetInnerHTML={{ __html: proyecto.antecedentes }}
              className='text-primary-300 p-2'
            />
          )}
        </div>
      </div>
      {/* OBJETIVO END*/}

      {/* PRODUCTOS START*/}
      <div
        className={`xBannerPaddings sticky top-0 h-screen flex flex-col items-center justify-center bg-primary-200  gap-8 w-full`}
      >
        <div className='flex flex-col justify-center items-center w-full p-4 gap-4 '>
          <h2 className='text-4xl font-bold text-bg-200 mb-2 text-center'>
            Producto esperados
          </h2>
          <ProyectosProductHtml htmlContent={proyecto.products ?? ''} />
        </div>
      </div>
      {/* PRODUCTOS END*/}

      {/* GENIALLY STARTS */}

      <div className='sticky top-0 h-screen flex flex-col items-center justify-center bg-indigo-600 text-white w-full'>
        <h2 className='text-4xl'>Genialy</h2>

        <div className='w-full p-20'>
          <iframe
            title='LISTA ÁTOMO'
            className='w-11/12 h-fit mx-auto'
            src='https://view.genial.ly/65be698af4f55500145640ce'
          />
        </div>

        <p>Scroll Down</p>
      </div>

      {/* GENIALLY ENDS */}

      {/* </div> */}
    </main>
  )
}
