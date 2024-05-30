import { TermsCountBars } from '@/projects'
import { Term } from './TermsCountBars'

interface Props {
  terms: Term[]
  baseUrl: string
  title: string
}

export const TermRowStats = ({ terms, baseUrl , title}: Props) => {
  return (
    <div className='w-full flex flex-col justify-start items-start  bg-bg-200 flex-grow h-full'>
      <div
        className={`w-full flex  flex-row justify-start items-start  bg-bg-200 py-6 lg:gap-6 sm:gap-4 gap-2 xBannerPaddings`}
      >
        <details className='w-full'>
          <summary className='text-text-200 font-semibold font-sans text-xl text-left mt-1 text-wrap leading-none lg:max-w-2xl sm:max-w-x hover:text-primary-100 hover:cursor-pointer w-full p-2'>
            {title}
          </summary>
          <TermsCountBars baseUrl={baseUrl} terms={terms} />
        </details>
      </div>
    </div>
  )
}
