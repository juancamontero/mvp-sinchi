import { getConvenioByIdForm, getSelloByIdForm,  } from "@/actions";
import {  CreateUpdateConvenioForm, CreateUpdateSellosForm, TitleAdmin } from "@/admin";


interface Props {
    params: {
      id: string
    }
  }

  
  export default async function EditSelloPage({params}: Props) {

    const {id} = params;

    const sello = id !== 'new' ? await getSelloByIdForm(Number(id)) : null
    const title = id === 'new' ? 'Nuevo sello' : `Editar sello ${sello?.name}`

    return (
        <div className='pageDefault w-full'>
        <TitleAdmin title={title} className='bg-bg-300 p-4' />
  
        <CreateUpdateSellosForm sello={sello ?? undefined}/>
  
  
      </div>
    );
  }