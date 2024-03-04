'use client'

import { Programa } from '@prisma/client'

import { useForm } from 'react-hook-form'

import clsx from 'clsx'

import { updateProgramasByLineaId } from '@/actions'
import { LoaderButton } from '@/components'

interface Props {
  lineaId: number
  allProgramas: Programa[]
  lineaToProgramas: number[]
}

interface FormInputs {
  programas: number[]
}

export const LineaProgramasForm = ({
  allProgramas,
  lineaToProgramas,
  lineaId,
}: Props) => {
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: { programas: lineaToProgramas },
  })

  watch('programas')
  const onToggleTerm = (id: number) => {
    const programas = new Set(getValues('programas'))
    programas.has(id) ? programas.delete(id) : programas.add(id)
    setValue('programas', Array.from(programas))
  }

  const onSubmit = async (data: FormInputs) => {
    const { ok } = await updateProgramasByLineaId(lineaId, data.programas)
    if (ok) {
      alert('Programas de la línea actualizados')
    } else alert('Error')
  }
  return (
    <div className='mt-2 w-full'>
      <div className='grid grid-cols-4 gap-1 mt-4'>
        {allProgramas.map((programa) => (
          <div
            key={programa.id}
            onClick={() => onToggleTerm(programa.id)}
            className={clsx(
              'p-2 flex flex-row justify-start items-center gap-2 border cursor-pointer rounded-sm transition-all text-center bg-bg-200 hover:bg-bg-300',
              {
                'bg-slate-600 text-white': getValues('programas').includes(
                  programa.id
                ),
              }
            )}
          >
            <p className='text-sm text-left'>{programa.preTitle}|{programa.name}</p>
          </div>
        ))}
      </div>
      <button
        className='btn-primary w-full mt-2'
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? <LoaderButton /> : 'Guardar'}
      </button>
    </div>
  )
}
