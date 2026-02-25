import React from "react"
import Link from "next/link"

interface Props {
  title: string
  link: string
  mobile?: boolean
}

const NavTitle = ({ title, link, mobile = false }: Props) => {
  return (
    <Link
      href={link}
      className={`
        flex items-center
        ${mobile ? "justify-start px-4 py-4" : "justify-center h-20"}
        text-gray-200
        hover:text-white
        transition-all duration-200
        ${mobile ? "rounded-xl hover:bg-white/5 active:bg-white/10" : "hover:border-b-2 hover:border-violet-600"}
      `}
    >
      <span className={`${mobile ? "text-base font-medium" : "text-sm font-normal"}`}>
        {title}
      </span>
    </Link>
  )
}

export default NavTitle