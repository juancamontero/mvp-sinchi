interface Props {
    html?: string | TrustedHTML | null
  
    scrollBarColor?: string
  }
  
  export const ProjectLongHtml = ({
    html,
  
    scrollBarColor = '#DFDED9',
  }: Props) => {
    if (!html) return <></>
    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className='transition text-base text-left text-text-200 leading-snug sinchi-list  overflow-x-hidden lg:max-h-[65vh] sm:max-h-[45vh]long-html px-1 lg:line-clamp-[15] lg:hover:line-clamp-none mt-2' // scroll-sinchi overflow-y-auto
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarColor: `${scrollBarColor} rgba(255, 255, 255, 0)`,
          scrollbarWidth: 'auto',
          columnFill: 'balance',
          /* Add media query for mobile screens */
        }}
      />
    )
  }
  