import Link from 'next/link'

import { Convenio, Imagen } from '@prisma/client'
import { TermsGrid } from '../..'
import Image from 'next/image'
// import { getConveniosByProjectId } from '..'

type Props = {
  convenios: (Convenio & { imagen?: Imagen | null })[]
}
// export const ConveniosGrid = async ({ idProject }: Props) => {
export const ConveniosGrid = ({ convenios }: Props) => {
  // const convenios = await getConveniosByProjectId(idProject)

  if (!convenios) return <>Sin convenios</>
  return (
    <div className='w-full flex flex-row justify-start items-start'>
      <div className='flex flex-row justify-start items-start flex-wrap w-fit gap-4 bg-bg-100 p-4'>
        {convenios.map((convenio) => (
          <Link key={convenio.id} href={`/convenio/${convenio.id}`}>
            {convenio.imagen ? (
              <Image
                src={convenio.imagen?.url ?? '/images/placeholder-img.jpeg'}
                width={150}
                height={150}
                alt={convenio.name}
              />
            ) : (
              <span
                className={`inline-block p-3 text-primary-200 text-base font-medium text-pretty shadow-sm bg-bg-200`}
              >
                {convenio.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
