import { getConvenioByIdForm,  } from "@/actions";
import {  CreateUpdateConvenioForm, TitleAdmin } from "@/admin";


interface Props {
    params: {
      id: string
    }
  }

  
  export default async function EditSelloPage({params}: Props) {

    const {id} = params;

    const sello = id !== 'new' ? await getConvenioByIdForm(Number(id)) : null
    const title = id === 'new' ? 'Nuevo aliado' : `Editar aliado ${sello?.name}`

    return (
        <div className='pageDefault w-full'>
        <TitleAdmin title={title} className='bg-bg-300 p-4' />
  
        <CreateUpdateConvenioForm convenio={sello ?? undefined}/>
  
  
      </div>
    );
  }