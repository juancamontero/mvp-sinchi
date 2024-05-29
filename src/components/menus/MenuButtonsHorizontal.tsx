import { MenuButtonsHorizontalItem } from './MenuButtonsHorizontalItem'

interface MenuItem {
  url: string
  text: string
}

interface Props {
  menuItems: MenuItem[]
}

export const MenuButtonsHorizontal = ({ menuItems }: Props) => {
  if (!menuItems) return null
  return (
    <div className='flex flex-col lg:flex-row items-center lg:justify-center justify-start gap-1 lg:my-2 my-1'>
      {menuItems.map((item, index) => (
        <>
          <MenuButtonsHorizontalItem
            key={`${item.url}`}
            url={item.url}
            text={item.text}
          />
        </>
      ))}
    </div>
  )
}
