'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

import { Autor, Linea, Programa, Proyecto } from '@prisma/client'

import dynamic from 'next/dynamic'
// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css' // Import the styles

import styles from '../AdminStyles.module.css'

import {
  createUpdateProduct,
  deleteProject,
  deleteProjectImage,
} from '@/actions'
import { AccordionForForm, HtmlContentPreview, TitleAdmin } from '@/admin'

import { LoaderButton } from '@/components'

interface ImagenProyecto {
  id: number
  url: string
}

interface Props {
  project: Partial<Proyecto> & { imagen?: ImagenProyecto | null }
  lineas: Linea[]
  programas: Programa[]
  investigadores: Autor[]
}

interface FormInputs {
  idLinea: number
  idPrograma: number
  idAtutor: number
  equipo: string
  completed: boolean
  year: number
  name: string
  objetivo: string
  products: string
  places: string
  importancia: string
  pertinencia: string
  impacto: string
  image?: FileList
}

export const ProjectForm = ({
  project,
  lineas,
  programas,
  investigadores,
}: Props) => {
  //use form set
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      name: project.name,
      completed: project.completed,
      year: project.year,
      idLinea: project.idLinea ?? undefined,
      idPrograma: project.idPrograma ?? undefined,
      idAtutor: project.idAtutor ?? undefined,
      equipo: project.equipo ?? '',
      importancia: project.importancia ?? '',
      pertinencia: project.pertinencia ?? '',
      impacto: project.impacto ?? '',
      products: project.products ?? '',
      places: project.places ?? '',
      objetivo: project.objetivo ?? '',

      image: undefined,
    },
  })
  // * loader
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  // * preview image
  const previewImage = watch('image')?.[0]
  const previewImageUrl = previewImage
    ? URL.createObjectURL(previewImage)
    : project.imagen?.url ?? '/images/placeholder-img.jpeg'

  //* Reactquill inputs
  useEffect(() => {
    register('products', { required: false })
    register('objetivo', { required: false })
  }, [register])

  const onProductsChange = (editorState: string) => {
    setValue('products', editorState)
  }
  const onObjetivoChange = (editorState: string) => {
    setValue('objetivo', editorState)
  }

  const productsContent = watch('products')
  const objetivosContent = watch('objetivo')

  const onSubmit = async (data: FormInputs) => {

    const formData = new FormData()

    const { image, ...projectToSave } = data
    if (project.id) formData.append('id', project.id.toString() ?? '')

    formData.append('name', projectToSave.name)
    formData.append('year', projectToSave.year.toString())
    formData.append('completed', projectToSave.completed.toString())
    formData.append('idLinea', projectToSave.idLinea.toString())
    formData.append('idPrograma', projectToSave.idPrograma.toString())
    formData.append('idAtutor', projectToSave.idAtutor.toString())
    formData.append('equipo', projectToSave.equipo)
    formData.append('importancia', projectToSave.importancia)
    formData.append('pertinencia', projectToSave.pertinencia)
    formData.append('impacto', projectToSave.impacto)
    formData.append('products', projectToSave.products)
    formData.append('places', projectToSave.places)
    formData.append('objetivo', projectToSave.objetivo)

    if (image && image[0]) {
      formData.append('image', image[0])
    }

    const { ok, project: updatedProject } = await createUpdateProduct(formData)

    if (ok) {
      router.replace(`/admin/proyecto/${updatedProject!.id}`)
      alert('Proyecto actualizado/creado correctamente!')
    } else alert('Error, mo se pudo crear o actualizar el proyecto')

  }

  const onClickDeleteProject = async () => {
    if (!project.id) return
    setIsLoading(true)

    const confirmDelete = confirm(
      `¿Estás seguro de que quieres eliminar el proyecto ${project.name}`
    )
    if (confirmDelete) {
      const deletedProject = await deleteProject(project!.id!)
      alert(`Proyecto con id:${deletedProject.id}`)
    }
    setIsLoading(false)
    router.replace('/admin/proyectos')
  }

  return (
    <div className='flex flex-col justify-start items-start p-2 rounded-sm border w-full'>
      <TitleAdmin
        title={project?.name ?? 'Sin nombre'}
        subTitle={`Proyecto ID: ${
          project?.id ? project.id : 'Sin id'
        } | Edición / Eliminación`}
      />
      <div className='flex flex-row justify-start items-stretch w-full gap-3'>
        {/* YEAR */}
        <div className='flex flex-col mb-2 w-10/12'>
          <label htmlFor='year' className={`${styles['form-label']}`}>
            Año
          </label>
          <input
            type='number'
            className={`${styles['form-input']} h-full w-2/12`}
            {...register('year', { required: true })}
          />
          {errors.year && (
            <span className={styles['form-error']}>Requerido</span>
          )}
        </div>

        {/* COMPLETED */}
        <div className='flex flex-col mb-2 '>
          <label htmlFor='completed' className={`${styles['form-label']}`}>
            Completado?
          </label>
          <input
            type='checkbox'
            className={`${styles['form-input']} h-6 m-auto`}
            {...register('completed')}
          />
        </div>
      </div>

      <div className='flex flex-row justify-start items-stretch w-full gap-3'>
        {/* NOMBRE */}
        <div className='flex flex-col mb-2 w-3/5'>
          <label htmlFor='name' className={`${styles['form-label']}`}>
            Nombre del proyecto
          </label>
          <textarea
            className={`${styles['form-input']} h-full`}
            {...register('name', { required: true, minLength: 5 })}
          />
          {errors.name && (
            <span className={styles['form-error']}>
              Requerido | Mínimo 5 letras
            </span>
          )}
        </div>

        {/* IMAGEN */}
        <div className='flex flex-col mb-2 w-2/5 '>
          <label htmlFor='urlImage' className={`${styles['form-label']}`}>
            Imagen destacada
          </label>
          <input
            type='file'
            {...register('image')}
            className={`${styles['form-input-files']}`}
            accept='image/png, image/jpeg, image/jpg, image/webp'
          />

          <Image
            src={previewImageUrl}
            alt={'Imagen proyecto'}
            width={300}
            height={250}
            className='mx-auto py-2'
          />

          <button
            type='button'
            onClick={() =>
              deleteProjectImage(project.imagen?.id, project.imagen?.url)
            }
            className='btn-danger w-full rounded-b-xl '
          >
            Eliminar
          </button>
          {/* <Link
         href={`/admin/imagenes/proyecto/${project.id}`}
       
            className='btn-secondary w-full rounded-b-xl text-center '
          >
            Seleccionar imagen existente 
          </Link> */}
        </div>
        {/* IMAGEN ENDS */}
      </div>

      <div className='flex flex-col mb-2 w-full'>
        {/* LINEA */}
        <label htmlFor='idLinea' className={`${styles['form-label']}`}>
          Línea de investigación
        </label>
        <select
          className={`${styles['form-input']}`}
          {...register('idLinea', { required: true })}
        >
          {errors.idLinea && (
            <span className={styles['form-error']}>Requerido - {errors.idLinea.type}</span>
          )}
          <option value=''>[Seleccione]</option>
          {lineas.map((linea) => (
            <option key={linea.id} value={linea.id}>
              {`${linea.preTitle}-${linea.name}`}
            </option>
          ))}
        </select>

        {/* PROGRAMA */}
        <label htmlFor='idPrograma' className={`${styles['form-label']}`}>
          Programa de investigación
        </label>
        <select
          className={`${styles['form-input']}`}
          {...register('idPrograma', { required: true })}
        >
          {' '}
          {errors.idPrograma && (
            <span className={styles['form-error']}>Requerido</span>
          )}
          <option value=''>[Seleccione]</option>
          {programas.map((prog) => (
            <option key={prog.id} value={prog.id}>
              {`${prog.preTitle}-${prog.name}`}
            </option>
          ))}
        </select>

        {/* INVESTIGADOR RESPONSABLE */}
        <label htmlFor='idPrograma' className={`${styles['form-label']}`}>
          Investigador responsable
        </label>
        <select
          className={`${styles['form-input']}`}
          {...register('idAtutor', { required: true })}
        >
          {errors.idAtutor && (
            <span className={styles['form-error']}>Requerido</span>
          )}
          <option value=''>[Seleccione]</option>
          {investigadores.map((invest) => (
            <option key={invest.id} value={invest.id}>
              {`${invest.name}`}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col mb-2 w-full gap-2'>
        {/* EQUIPO */}

        <div className='flex flex-col mb-2 w-full'>
          <label htmlFor='name' className={`${styles['form-label']}`}>
            Equipo técnico SINCHI
          </label>
          <textarea
            rows={2}
            className={`${styles['form-input']}`}
            {...register('equipo', { required: false })}
          />
        </div>

        {/* LUGARES | PLACES */}

        <div className='flex flex-col mb-2 w-full'>
          <label htmlFor='name' className={`${styles['form-label']}`}>
            Municipios | Lugares
          </label>
          <textarea
            rows={2}
            className={`${styles['form-input']}`}
            {...register('places', { required: false })}
          />
        </div>

        {/* JUSTIFICACION (importancia | pertinenci |impacto) */}
        <TitleAdmin title='Justificación' className='text-center' />
        <div className='flex flex-row justify-start items-start gap-2'>
          {/* IMPORTANCIA */}
          <div className='flex flex-col mb-2 w-1/3'>
            <label htmlFor='importancia' className={`${styles['form-label']}`}>
              Importancia
            </label>
            <textarea
              rows={8}
              className={`${styles['form-input']}`}
              {...register('importancia', { required: false })}
            />
          </div>
          {/* PERTINENCIA */}
          <div className='flex flex-col mb-2 w-1/3'>
            <label htmlFor='pertinencia' className={`${styles['form-label']}`}>
              Pertinencia
            </label>
            <textarea
              rows={8}
              className={`${styles['form-input']}`}
              {...register('pertinencia', { required: false })}
            />
          </div>
          {/* IMPACTO */}
          <div className='flex flex-col mb-2 w-1/3'>
            <label htmlFor='impacto' className={`${styles['form-label']}`}>
              Impacto
            </label>
            <textarea
              rows={8}
              className={`${styles['form-input']}`}
              {...register('impacto', { required: false })}
            />
          </div>
        </div>
      </div>
      {/* TEXTOS LARGOS */}

      {/*OBJETIVO*/}
      <AccordionForForm title='Objetivo'>
        <ReactQuill
          theme='snow'
          value={objetivosContent}
          onChange={onObjetivoChange}
        />
        <HtmlContentPreview htmlContent={objetivosContent} />
      </AccordionForForm>

      {/* Productos esperados */}
      <AccordionForForm title='Productos esperados'>
        <ReactQuill
          theme='snow'
          value={productsContent}
          onChange={onProductsChange}
        />
        <HtmlContentPreview htmlContent={productsContent} />
      </AccordionForForm>

      <button
        className='btn-primary w-full mt-2'
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? <LoaderButton /> : 'Guardar'}
      </button>
      <Link
        className='btn-secondary w-full mt-2 text-center text-xs'
        href={`/admin/palabras-clave/proyecto/${project.id}`}
      >
        Editar palabras clave
      </Link>
      <Link
        className='btn-secondary w-full mt-2 text-center text-xs'
        href={`/admin/convenios/proyecto/${project.id}`}
      >
        Editar aliados
      </Link>
      <button
        className='btn-danger w-full mt-2'
        onClick={onClickDeleteProject}
      >
        {isSubmitting ? <LoaderButton /> : 'Borrar proyecto'}
      </button>
    </div>
  )
}
