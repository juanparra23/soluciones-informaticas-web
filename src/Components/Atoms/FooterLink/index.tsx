import Link from "next/link"

type Props = {
  href: string
  children: React.ReactNode
}

export default function FooterLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="text-white/60 text-sm hover:text-cyan-400 transition-colors duration-300 block mb-2"
    >
      {children}
    </Link>
  )
}
