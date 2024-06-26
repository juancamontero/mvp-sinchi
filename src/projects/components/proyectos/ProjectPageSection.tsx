import { ArrowDown } from '../ui/ArrowDown'

interface Props {
  className?: React.StyleHTMLAttributes<HTMLDivElement>['className']
  children: React.ReactNode
  linkStyle?: React.StyleHTMLAttributes<HTMLDivElement>['className']
  arrowRef?: string
  fullLgHeight?: boolean
  enablePaddings?: boolean
}

export const ProjectPageSection = ({
  className,
  children,
  linkStyle,
  arrowRef,
  fullLgHeight = true,
  enablePaddings = true,
}: Props) => {
  return (
    <div
      className={`lg:sticky lg:top-0 snap-end  h-fit  flex flex-col items-center justify-center lg:gap-8 w-full lg:py-0 py-8 ${className}  ${
        fullLgHeight ? ' lg:h-full' : ''
      } ${enablePaddings ? 'xBannerPaddings' : ''}`}
    >
      {children}
      {fullLgHeight && (
        <div className='absolute left-1/2 bottom-8'>
          <ArrowDown href={arrowRef ?? '#'} className={linkStyle} />
        </div>
      )}
    </div>
  )
}
