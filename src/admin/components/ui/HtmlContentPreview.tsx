import styles from './HtmlPreview.module.css'

interface Props {
  htmlContent: string | TrustedHTML
}

export const HtmlContentPreview = ({ htmlContent = '' }: Props) => {
  return (
    <div className='p-2 bg-bg-200 my-1 shadow-sm'>
      <h3 className='font-semibold font-xl mb-2'>Previsualización</h3>
      <div
        className={`text-text-200 overflow-x-auto h-[450px] text-xs p-2 bg-bg-100 ${styles.productos}`}
        dangerouslySetInnerHTML={{ __html: `${htmlContent}` }}
      />
    </div>
  )
}
