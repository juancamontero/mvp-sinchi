'use client'
import { updateTagsByProjectId } from '@/actions'
import { CreateUpdateTagForm } from '@/admin'
import { LoaderButton } from '@/components'
import { Tag } from '@prisma/client'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  projectId: number
  allTags: Tag[]
  projectTags: Tag[]
}

interface FormInputs {
  tags: number[]
}

export const ProjectTagsForm = ({ allTags, projectTags, projectId }: Props) => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const projectTagsId = projectTags.map((tag) => tag.id)

  const {
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: { tags: projectTagsId },
  })

  watch('tags')
  const onToggleTag = (id: number) => {
    const tags = new Set(getValues('tags'))
    tags.has(id) ? tags.delete(id) : tags.add(id)
    setValue('tags', Array.from(tags))
  }

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true)
    const { ok } = await updateTagsByProjectId(projectId, data.tags)
    if (ok) {
      alert('Palabras clave actualizadas')
    } else alert('Error')
    setIsLoading(false)
  }
  return (
    <div className='mt-2 w-full'>
      <CreateUpdateTagForm />
      <div className='grid grid-cols-6 gap-1 mt-4'>
        {allTags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => onToggleTag(tag.id)}
            className={clsx(
              '  p-2 border cursor-pointer rounded-sm transition-all text-center bg-bg-200 hover:bg-bg-300',
              {
                'bg-slate-600 text-white': getValues('tags').includes(tag.id),
              }
            )}
          >
            <p className='text-sm'>{tag.name}</p>
          </div>
        ))}
      </div>
      <button
        className='btn-primary w-full mt-2'
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? <LoaderButton /> : 'Guardar'}
      </button>
    </div>
  )
}
