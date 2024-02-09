import Link from 'next/link'
import { MenuItem, menuItem } from './MenuItem'




interface Props {
  menuItems: menuItem[]
}


export const VerticalMenu = ({menuItems}:Props) => {


  return (
    <>
      {/* title and close button */}
   

      <div className='flex flex-col justify-between flex-1 mt-6'>
        {/* menu start */}
        <nav>
          {menuItems.map((item, index) => (
            <MenuItem key={`${item.text}-${item.path}-${index + 1}`} {...item}/>
          ))}
        </nav>
      </div>
    </>
  )
}