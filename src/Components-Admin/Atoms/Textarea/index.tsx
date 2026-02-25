import React from 'react'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({ className = '', ...props }) => {
  return (
    <textarea
      {...props}
      className={`
        w-full px-4 py-3
        rounded-xl
        border border-gray-300
        bg-white text-gray-900
        placeholder-gray-400
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
        transition
        resize-none
        ${className}
      `}
    />
  )
}

export default Textarea
