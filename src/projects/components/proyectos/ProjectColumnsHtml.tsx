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
      className='lg:h-[35vh]  h-[40vh] columns-1 sm:columns-2 lg:columns-3  gap-12 overflow-x-auto snap-x snap-mandatory overflow-y-hidden  scroll-sinchi long-html' //scroll-sinchi
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarColor: `${scrollBarColor} rgba(255, 255, 255, 0)`,
        scrollbarWidth: 'auto',
        columnFill: 'balance',
        overflowX: 'auto',
        /* Add media query for mobile screens */
      }}
    />
  )
}
