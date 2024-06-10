import { Suspense } from 'react'
import { LoaderDefault } from '..'

interface VideoBg {
  url: string | null
  width?: number
  height?: number
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
}

export const VideoBg = ({ url, width = 144, height = 144, className }: VideoBg) => {
  if (!url) return <></>
  return (
    <div>
      <Suspense fallback={<LoaderDefault/>}>
        <iframe
          className={`z-0 pointer-events-none ${className}`}
          width={width}
          height={height}
          src={url}
          title='YouTube video player'
     
        />
      </Suspense>
    </div>
  )
}
