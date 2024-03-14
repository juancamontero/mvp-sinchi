

interface Props {
  className?: React.StyleHTMLAttributes<HTMLDivElement>['className']
  children: React.ReactNode
}

export const ProjectPageSection = ({ className, children }: Props) => {
  return (
    <div
      className={`xBannerPaddings sticky top-0 lg:h-full h-fit  flex flex-col items-center justify-center lg:gap-8 w-full lg:py-0 py-8 ${className}`}
    >
      {children}
    </div>
  )
}
