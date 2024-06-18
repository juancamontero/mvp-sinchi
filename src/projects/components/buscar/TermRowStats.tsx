import { TermsCountBars } from '@/projects'
import { Term } from './TermsCountBars'

interface Props {
  terms?: Term[]
  baseUrl?: string
  title: string
  children?: React.ReactNode
}

export const TermRowStats = ({ terms, baseUrl, title, children }: Props) => {
  return (
    <div className='w-full flex flex-col justify-start items-start flex-grow  bg-bg-200'>
      <div
        className={`w-full flex flex-row justify-start items-start  bg-bg-200  lg:pt-4 pt-1 lg:gap-6 sm:gap-4 gap-2 xBannerPaddings`}
      >
        <details className='w-full'>
          <summary className='text-text-200 font-semibold font-sans text-xl text-left mt-1 text-wrap leading-none lg:max-w-2xl sm:max-w-x hover:text-primary-100 hover:cursor-pointer w-full p-2'>
            {title}
          </summary>
          {terms && baseUrl && (
            <TermsCountBars baseUrl={baseUrl} terms={terms} />
          )}
          {children}
        </details>
      </div>
    </div>
  )
}
