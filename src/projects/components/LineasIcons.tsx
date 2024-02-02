import { FaHandHoldingWater, FaPeopleCarry } from 'react-icons/fa'
import { GiCircleForest, GiFarmer } from 'react-icons/gi'
import { IoFlowerOutline } from 'react-icons/io5'
import { PiBugBeetleBold, PiSunHorizon } from 'react-icons/pi'

const ICON_SIZE = 40

const lineasIcons = [
  { id: 1, icon: <PiBugBeetleBold size={ICON_SIZE} /> },
  { id: 2, icon: <FaHandHoldingWater size={ICON_SIZE} /> },
  { id: 3, icon: <GiCircleForest size={ICON_SIZE} /> },
  { id: 4, icon: <GiFarmer size={ICON_SIZE} /> },
  { id: 5, icon: <PiSunHorizon size={ICON_SIZE} /> },
  { id: 6, icon: <FaPeopleCarry size={ICON_SIZE} /> },
]

interface Props {
  id: number
  size?: number
}
export const IconLinea = ({ id , size=ICON_SIZE}: Props) => {
  
    if (id > lineasIcons.length) return <IoFlowerOutline size={size} />

    const iconObject = lineasIcons.find( icon => icon.id === id)



  return <>{iconObject?.icon}</>
}
