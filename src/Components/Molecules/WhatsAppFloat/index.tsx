"use client"

type Props = {
  phone: string
  message?: string
}

export default function WhatsAppFloat({ phone, message }: Props) {
  const text = encodeURIComponent(
    message ?? "Hola, quiero información. ¿Me puedes ayudar?"
  )

  const href = `https://wa.me/${phone}?text=${text}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="
        fixed bottom-5 right-5 z-[2000]
        w-14 h-14 rounded-full
        bg-green-500 hover:bg-green-600
        shadow-xl hover:shadow-2xl
        flex items-center justify-center
        transition
      "
    >
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="white"
        aria-hidden="true"
      >
        <path d="M19.11 17.19c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.35-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.83-2.01-.22-.52-.45-.45-.61-.46l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.82-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
        <path d="M16.02 3C8.84 3 3 8.84 3 16.02c0 2.28.6 4.51 1.73 6.49L3 29l6.66-1.69a13 13 0 0 0 6.36 1.62h.01C23.2 28.93 29 23.1 29 15.98 29 8.84 23.16 3 16.02 3zm0 23.66h-.01c-2.09 0-4.13-.56-5.9-1.62l-.42-.25-3.95 1 1.05-3.85-.27-.4a11.6 11.6 0 0 1-1.84-6.3C4.68 9.82 9.83 4.68 16.02 4.68c6.17 0 11.3 5.12 11.3 11.3 0 6.16-5.13 11.68-11.3 10.68z" />
      </svg>
    </a>
  )
}
