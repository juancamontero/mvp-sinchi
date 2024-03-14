interface Props {
  html?: string | TrustedHTML | null

  scrollBarColor?: string

}

export const ProjectColumnsHtml = ({
  html,

  scrollBarColor = '#DFDED9',

}: Props) => {
  if (!html) return <></>
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className='lg:h-[35vh]  h-[40vh] p-2 columns-1 sm:columns-2 lg:columns-3  gap-10 overflow-x-auto w-full scroll-sinchi'
      style={{
        WebkitOverflowScrolling: 'touch' ,
        // scrollbarWidth: 'auto' /* For Firefox */,
        scrollbarColor: `${scrollBarColor} rgba(255, 255, 255, 0)`,
        scrollbarWidth: 'auto',
        
      }}
    />
  )
}
