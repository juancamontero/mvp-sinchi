import { getRegionById, } from "@/actions";
import { CreateUpdateRegionForm, TitleAdmin } from "@/admin";


interface Props {
    params: {
      id: string
    }
  }

  
  export default async function EditRegionPage({params}: Props) {

    const {id} = params;

    const region = id !== 'new' ? await getRegionById(Number(id)) : null
    const title = id === 'new' ? 'Nueva región' : `Editar región ${region?.name}`

    return (
        <div className='pageDefault w-full'>
        <TitleAdmin title={title} className='bg-bg-300 p-4' />
  
        <CreateUpdateRegionForm region={region ?? {}}/>
  
  
      </div>
    );
  }