
type Props = {
  children: React.ReactNode
}

export default function FooterText({ children }: Props) {
  return (
    <p className="text-white/60 text-sm leading-6">
      {children}
    </p>
  )
}


