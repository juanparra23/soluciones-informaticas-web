type Props = {
  title: string
  children: React.ReactNode
}

export default function FooterColumn({ title, children }: Props) {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
        {title}
      </h4>
      {children}
    </div>
  )
}
