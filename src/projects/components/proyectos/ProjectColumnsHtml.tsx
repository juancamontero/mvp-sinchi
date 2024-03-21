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
      className='lg:h-[35vh]  h-[40vh] p-2 columns-1 sm:columns-2 lg:columns-3  gap-12 overflow-x-auto overflow-y-hidden w-full scroll-sinchi long-html'
      style={{
        WebkitOverflowScrolling: 'touch',
        // scrollbarWidth: 'auto' /* For Firefox */,
        scrollbarColor: `${scrollBarColor} rgba(255, 255, 255, 0)`,
        scrollbarWidth: 'auto',
        columnFill: 'balance',
        overflowX: 'auto'
        /* Add media query for mobile screens */
      }}
    />
  )
}
