'use client'
import Image from 'next/image'

import { LoaderButton } from '@/components'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../AdminStyles.module.css'
import { uploadImagesFullProcess } from '@/actions'
import { useRouter } from 'next/navigation'


interface FormInputs {
  image: FileList
}

export const UploadImage = () => {
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      image: undefined,
    },
  })
  const router = useRouter()
  const previewImage = watch('image')?.[0]

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', data.image[0])
    console.log(formData)

    await uploadImagesFullProcess(formData)
    setIsLoading(false)
    router.refresh()
  }
  //todo upload multiple images
  //todo insert name for each image
  return (
    <div className='flex flex-col mb-2 w-full '>
      <label htmlFor='urlImage' className={`${styles['form-label']}`}>
        Cargar imagen
      </label>
      <div className='flex flex-row items-stretch justify-start  bg-gray-100 '>
        <input
          type='file'
          {...register('image', { required: true })}
          className={`${styles['form-input-image']} w-9/12`}
          accept='image/png, image/jpeg, image/jpg, image/webp'
        />
        {previewImage && (
          <div className={`w-3/12 p-3`}>
            <Image
              src={URL.createObjectURL(previewImage)}
              alt='Selected image preview'
              width={300}
              height={300}
            />
          </div>
        )}
      </div>

      <button
        className='btn-primary w-full text-center'
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? <LoaderButton /> : 'Cargar imagen'}
      </button>
    </div>
  )
}
