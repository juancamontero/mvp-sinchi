import {
  LineaProgramaGridTerm,
  LineaProgramaRowGrid,
} from './LineaProgramaRowGrid'
import { IconLinea } from './LineasIcons'

interface Props {
  urlIcon: string | undefined
  name: string
  baseUrl: string
  terms: LineaProgramaGridTerm[]
  children?: React.ReactNode
  subTitle: string
  baseColor?: string
}

export const LineaProgramaBanner = ({
  urlIcon,
  name,
  baseUrl,
  terms,
  children,
  subTitle,
  baseColor,
}: Props) => {
  return (
    <div
      className={`xBannerPaddings sm:sticky sm:top-0 h-fit flex flex-col gap-2 flex-wrap items-center  w-full py-6  z-10 mb-1 bg-bg-300 `}
    >
      <IconLinea urlIcon={urlIcon} name={name} size={62} />

      <h2
        className={`text-2xl font-semibold text-center mx-1 text-wrap leading-none ${
          baseColor ? '' : 'text-primary-300'
        }`}
        style={{ color: baseColor ? baseColor : undefined }}
      >
        {`Programa de investigación`}
      </h2>
      <h3
        className={`text-xl font-medium text-primary-300 text-center mx-1 text-wrap leading-none max-w-screen-xl ${
          baseColor ? '' : 'text-primary-300'
        }`}
        style={{ color: baseColor ? baseColor : undefined }}
      >
        {`${name}`}
      </h3>
      <h4 className='text-base text-primary-100 text-center mx-1 text-wrap leading-none mt-2'>
        {subTitle}
      </h4>
      <div className='flex flex-col flex-1 w-full mt-1'>
        <LineaProgramaRowGrid terms={terms} baseUrl={baseUrl} />
      </div>

      {children}

      {/* hitos */}
    </div>
  )
}
