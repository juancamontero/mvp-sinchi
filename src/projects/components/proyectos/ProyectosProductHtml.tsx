

import styles from './ProyectosHtml.module.css'

interface Props {
    htmlContent?: string | TrustedHTML
}


export const ProyectosProductHtml = ({htmlContent=''}: Props) => {
  return <div 
  className={`text-bg-200 overflow-x-auto h-[450px] ${styles.productos}`}
  dangerouslySetInnerHTML={{ __html: `${htmlContent}` }} 
  />
}

