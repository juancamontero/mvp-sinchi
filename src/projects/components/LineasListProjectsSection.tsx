import { Linea } from '@prisma/client'
import {
  LineaCarouselProjects,
} from './LineaCarouselProjects'

interface Props {
  lineas: Linea[]
}

import styles from '../../Defaults.module.css'


export const LineasListProjectsSection = ({ lineas =[] }: Props) => {
  if (lineas.length===0) return <h1>No hay proyectos en esa línea</h1>
  return (
    <div className={styles.lineaProgramProjectsSection}>
      {lineas.map((linea) => (
        <LineaCarouselProjects key={linea.id} linea={linea} />
      ))}
    </div>
  )
}
