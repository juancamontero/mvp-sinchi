type Props = {
  completed: boolean
}
export const ProjectStateWidget = ({ completed }: Props) => {
  return (
    <>
      <span
        className={`inline-block p-2 text-center roundedtext-xs font-medium tracking-widest w-12 h-12 mb-2 text-xs
        ${completed ? ' bg-green-200' : ' bg-yellow-200 text-slate-900'}`}
      >
        {completed ? 'OK' : 'PEND'}
      </span>
    </>
  )
}
