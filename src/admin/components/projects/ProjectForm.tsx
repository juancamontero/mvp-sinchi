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
  createUpdateProject,
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
  roleInvestigador: string
  antecedentes: string
  descripcion: string
  actores: string
  beneficiarios: string

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
      roleInvestigador: project.roleInvestigador ?? '',
      antecedentes: project.antecedentes ?? '',
      descripcion: project.descripcion ?? '',
      actores: project.actores ?? '',
      beneficiarios: project.beneficiarios ?? '',

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
    register('importancia', { required: false })
    register('pertinencia', { required: false })
    register('impacto', { required: false })
    register('antecedentes', { required: false })
    register('descripcion', { required: false })
    register('actores', { required: false })
    register('beneficiarios', { required: false })
  }, [register])

  const onHtmlChange = (fieldName: keyof FormInputs, editorState: string) => {
    setValue(fieldName, editorState)
  }

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
    formData.append('roleInvestigador', projectToSave.roleInvestigador)
    formData.append('antecedentes', projectToSave.antecedentes)
    formData.append('descripcion', projectToSave.descripcion)
    formData.append('actores', projectToSave.actores)
    formData.append('beneficiarios', projectToSave.beneficiarios)

    if (image && image[0]) {
      formData.append('image', image[0])
    }

    const { ok, project: updatedProject } = await createUpdateProject(formData)

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
            <span className={styles['form-error']}>
              Requerido - {errors.idLinea.type}
            </span>
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
        {/* ROLE INVES */}
        <div className='flex flex-col mb-2 w-full'>
          <label
            htmlFor='roleInvestigador'
            className={`${styles['form-label']}`}
          >
            Role investigador responsable
          </label>
          <input
            type='text'
            placeholder='min 3 / max 100 letras'
            className={`${styles['form-input']}`}
            {...register('roleInvestigador', {
              required: false,
              maxLength: 100,
              minLength: 3,
            })}
          />
        </div>
        {/* EQUIPO */}

        <div className='flex flex-col mb-2 w-full'>
          <label htmlFor='equipo' className={`${styles['form-label']}`}>
            Equipo técnico SINCHI
          </label>
          <textarea
            rows={2}
            className={`${styles['form-input']}`}
            {...register('equipo', { required: false })}
          />
        </div>

        {/* ANTECEDENTES */}
        <div className='flex flex-col mb-2 w-full'>
          <AccordionForForm title='Antecedentes'>
            <ReactQuill
              theme='snow'
              value={watch('antecedentes')}
              onChange={(content) => onHtmlChange('antecedentes', content)}
            />
            <HtmlContentPreview htmlContent={watch('antecedentes')} />
          </AccordionForForm>
        </div>
        {/* DESCRIPTION */}
        <div className='flex flex-col mb-2 w-full'>
          <AccordionForForm title='Descripción'>
            <ReactQuill
              theme='snow'
              value={watch('descripcion')}
              onChange={(content) => onHtmlChange('descripcion', content)}
            />
            <HtmlContentPreview htmlContent={watch('descripcion')} />
          </AccordionForForm>
        </div>

        {/* LUGARES | PLACES */}
        <div className='flex flex-col justify-start items-start bg-bg-300 p-2 w-full'>
          <TitleAdmin title='Ubicación' className='text-center' />
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
          <Link
            className='btn-secondary w-full mt-2 text-center text-xs'
            href={`/admin/regiones/proyecto/${project.id}`}
          >
            Editar regiones del proyecto
          </Link>
          <Link
            className='btn-primary w-full mt-2 text-center text-xs'
            href={`/admin/mapas/proyecto/${project.id}`}
          >
            Editar mapas del proyecto
          </Link>
        </div>

        {/* JUSTIFICACION (importancia | pertinenci |impacto) */}
        <div className='flex flex-col justify-start items-start bg-bg-300 p-2 w-full'>
          <TitleAdmin title='Justificación' className='text-center' />

          {/* IMPORTANCIA */}
          <div className='flex flex-col mt-1 w-full'>
            <AccordionForForm title='Importancia'>
              <ReactQuill
                className='long-html'
                theme='snow'
                value={watch('importancia')}
                onChange={(content) => onHtmlChange('importancia', content)}
              />
              <HtmlContentPreview htmlContent={watch('importancia')} />
            </AccordionForForm>
          </div>
          {/* PERTINENCIA */}
          <div className='flex flex-col mt-1 w-full'>
            <AccordionForForm title='Pertinencia'>
              <ReactQuill
                theme='snow'
                value={watch('pertinencia')}
                onChange={(content) => onHtmlChange('pertinencia', content)}
              />
              <HtmlContentPreview htmlContent={watch('pertinencia')} />
            </AccordionForForm>
          </div>
          {/* IMPACTO */}
          <div className='flex flex-col mt-1 w-full'>
            <AccordionForForm title='Impacto'>
              <ReactQuill
                theme='snow'
                value={watch('impacto')}
                onChange={(content) => onHtmlChange('impacto', content)}
              />
              <HtmlContentPreview htmlContent={watch('impacto')} />
            </AccordionForForm>
          </div>
        </div>
      </div>
      {/* TEXTOS LARGOS */}

      {/*OBJETIVO + ALCANCE*/}
      <div className='flex flex-col justify-start items-start bg-bg-300 p-2 w-full mt-2'>
        <TitleAdmin
          title='Objetivo, alcance / productos esperados'
          className='text-center'
        />
        <AccordionForForm title='Objetivo'>
          <ReactQuill
            theme='snow'
            value={watch('objetivo')}
            onChange={(content) => onHtmlChange('objetivo', content)}
            // modules={{
            //   toolbar: {
            //     container: [['bold', 'italic', 'underline', 'strike'],  [{ 'header': 1 }, { 'header': 2 }, , { 'header': 3 }],               // custom button values
            //     [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }], ]
            //   },
            // }}
          />
          <HtmlContentPreview htmlContent={watch('objetivo')} />
        </AccordionForForm>

        {/* Productos esperados */}
        <AccordionForForm title='Alcance | Productos esperados'>
          <ReactQuill
            theme='snow'
            value={watch('products')}
            onChange={(content) => onHtmlChange('products', content)}
          />
          <HtmlContentPreview htmlContent={watch('products')} />
        </AccordionForForm>
      </div>

      {/* ACTORES + BENEFICIARIOS */}
      <div className='flex flex-col justify-start items-start bg-bg-300 p-2 w-full mt-2'>
        <TitleAdmin title='Actores y beneficiarios' className='text-center' />
        {/* ACTORES*/}
        <AccordionForForm title='Actores'>
          <ReactQuill
            theme='snow'
            value={watch('actores')}
            onChange={(content) => onHtmlChange('actores', content)}
          />
          <HtmlContentPreview htmlContent={watch('actores')} />
        </AccordionForForm>

        {/* BENDEFICIARIOS */}
        <AccordionForForm title='Beneficiarios'>
          <ReactQuill
            theme='snow'
            value={watch('beneficiarios')}
            onChange={(content) => onHtmlChange('beneficiarios', content)}
          />
          <HtmlContentPreview htmlContent={watch('beneficiarios')} />
        </AccordionForForm>
        <Link
          className='btn-secondary w-full mt-2 text-center text-xs'
          href={`/admin/indicadores/proyecto/${project.id}`}
        >
          Editar imágenes de indicadores del proyecto
        </Link>
      </div>

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
        Editar palabras clave del proyecto
      </Link>
      <Link
        className='btn-secondary w-full mt-2 text-center text-xs'
        href={`/admin/convenios/proyecto/${project.id}`}
      >
        Editar aliados del proyecto
      </Link>
      <Link
        className='btn-secondary w-full mt-2 text-center text-xs'
        href={`/admin/sellos/proyecto/${project.id}`}
      >
        Editar sellos del proyecto
      </Link>
      <Link
        className='btn-secondary w-full mt-2 text-center text-xs'
        href={`/admin/medios/proyecto/${project.id}`}
      >
        Editar multimedia
      </Link>
      <button className='btn-danger w-full mt-2' onClick={onClickDeleteProject}>
        {isSubmitting ? <LoaderButton /> : 'Borrar proyecto'}
      </button>
    </div>
  )
}
