import { ArrowDown } from '../ui/ArrowDown'

interface Props {
  className?: React.StyleHTMLAttributes<HTMLDivElement>['className']
  children: React.ReactNode
  linkStyle?: React.StyleHTMLAttributes<HTMLDivElement>['className']
  arrowRef?: string
}

export const ProjectPageSection = ({
  className,
  children,
  linkStyle,
  arrowRef,
}: Props) => {
  return (
    <div
      className={`xBannerPaddings snap-end sticky top-0 lg:h-full h-fit  flex flex-col items-center justify-center lg:gap-8 w-full lg:py-0 py-8 ${className}`}
    >
      {children}
      <div className='absolute left-1/2 bottom-8'>
        <ArrowDown href={arrowRef ?? '#'} className={linkStyle} />
      </div>
    </div>
  )
}
