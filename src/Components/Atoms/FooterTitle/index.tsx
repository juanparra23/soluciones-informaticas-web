type Props = {
  children: React.ReactNode
}

export default function FooterTitle({ children }: Props) {
  return (
    <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
      {children}
    </h4>
  )
}
