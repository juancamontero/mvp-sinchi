import { getTagById } from "@/actions";
import { CreateUpdateTagForm, TitleAdmin } from "@/admin";


interface Props {
    params: {
      id: string
    }
  }

  
  export default async function EditTagPage({params}: Props) {

    const {id} = params;

    const tag = id !== 'new' ? await getTagById(Number(id)) : null
    const title = id === 'new' ? 'Nueva palabra clave' : `Editar palabra clave ${tag?.name}`

    return (
        <div className='pageDefault w-full'>
        <TitleAdmin title={title} className='bg-bg-300 p-4' />
  
        <CreateUpdateTagForm tag={tag ?? {}}/>
  
  
      </div>
    );
  }