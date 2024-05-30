'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  url: string
  text: string
}

export const MenuButtonsHorizontalItem = ({ url, text }: Props) => {
  const active = usePathname() === url
  return (
    <>
      {active && (
        <Link
          href={url}
          className={`min-w-full lg:min-w-48 text-center leading-tight  text-xs font-light text-text-200   border-solid border-text-200 border py-1 px-3 rounded-sm transition-all bg-bg-150 pointer-events-none`}
        >
          {text}
        </Link>
      )}
      {!active && (
        <Link
          href={url}
          className={`min-w-full lg:min-w-48 text-center leading-tight bg-transparent text-xs font-light text-text-100   border-solid border-text-100 border py-1 px-3 rounded-sm transition-all hover:bg-bg-100 hover:text-text-200 hover:border-text-200`}
        >
          {text}
        </Link>
      )}
    </>
  )
}
