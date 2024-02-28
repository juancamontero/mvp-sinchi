interface Props {
  title?: string
  children: React.ReactNode
}

export const AccordionForForm = ({ children, title }: Props) => {
  return (
    <>
      <details className='mt-2 w-full bg-bg-200 cursor-pointer sm:px-4 sm:pb-2 py-1 px-1  shadow-sm leading-none'>
        <summary className='p-2 font-bold text-sm bg-bg-200 hover:text-primary-200'>
          {title ?? 'Más...'}
        </summary>
        <div className='w-full bg-bg-100'>{children}</div>
      </details>
    </>
  )
}
