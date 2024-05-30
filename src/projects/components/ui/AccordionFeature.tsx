interface Props {
  title: string
  content: string | React.ReactNode
}

export const AccordionFeature = ({ title, content = 'sin texto' }: Props) => {
  return (
    <details className='w-full bg-bg-200 cursor-pointer sm:px-4 sm:pt-3 sm:pb-2 py-1 px-2 hover:bg-white shadow-sm'>
      <summary className='text-text-200 mb-2   text-base font-semibold hover:text-primary-200'>
        {title}
      </summary>
      <>{content}</>
    </details>
  )
}
