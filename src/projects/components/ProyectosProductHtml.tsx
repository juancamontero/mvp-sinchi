
import { HTMLAttributes } from 'react'
import styles from './ProyectosHtml.module.css'
import { projectObjetivo , projectProductos} from '../helpers/dataSeed'

interface Props {
    htmlContent?: string | TrustedHTML
}


export const ProyectosProductHtml = ({htmlContent=''}: Props) => {
  return <div 
  className={`text-bg-100 overflow-x-auto h-[450px] ${styles.productos}`}
  dangerouslySetInnerHTML={{ __html: `${htmlContent}` }} 
  />
}

