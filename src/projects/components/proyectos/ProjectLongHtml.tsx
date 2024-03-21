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
        className='text-base text-left text-text-200 leading-snug sinchi-list overflow-y-auto lg:max-h-[35vh] sm:max-h-[45vh] scroll-sinchi long-html'
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
  