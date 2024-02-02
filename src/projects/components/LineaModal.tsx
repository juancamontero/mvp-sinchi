import { getLineaById } from '..'

interface Props {
  id: number
}

export const LineaModal = ({ id }: Props)=> {
  const linea = getLineaById(id)
  //   //   const { name } = linea
  if (!linea) return <h1>Linea NOT FOUND</h1>
  return (
    <div className='relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-blue-400 rounded-lg shadow-xl rtl:text-right sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
      <h2 className='bg-slate-950 text-teal-50 p-36'>JUANK</h2>
      <h2 className='bg-slate-950 text-teal-50 p-36'>{linea.name}</h2>
    </div>
  )
}
