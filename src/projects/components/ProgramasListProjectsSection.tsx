import { Programa } from '@prisma/client'
import { ProgramasCarouselProject } from '..'

interface Props {
  programas: Programa[]
}

import styles from '../../Defaults.module.css'

export const ProgramasListProjectsSection = ({ programas = [] }: Props) => {
  if (programas.length === 0) return <h1>No hay proyectos en este programa</h1>
  return (
    <div className={styles.lineaProgramProjectsSection}>
      {programas.map((prog) => (
        //   <LineaCarouselProjects key={linea.id} linea={linea} />

        <ProgramasCarouselProject key={prog.id} programa={prog} />
      ))}
    </div>
  )
}
