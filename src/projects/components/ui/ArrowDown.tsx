import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'

interface Props {
  href: string
  className?: React.StyleHTMLAttributes<HTMLDivElement>['className'] //
}

export const ArrowDown = ({ href, className }: Props) => {
  return (
    <Link
      href={href}
      className={`z-40 text-center hover:opacity-70  mx-auto ${className}`}
    >
      <FaChevronDown size={24} />
    </Link>
  )
}
