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
        className='transition text-base text-left text-text-200 leading-snug sinchi-list  overflow-x-visible lg:max-h-[55vh] sm:max-h-[45vh]long-html px-1  mt-2 scroll-sinchi overflow-y-auto title-italic' // 
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
  