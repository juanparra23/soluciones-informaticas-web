import React from 'react'



type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
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
        ${className}
      `}
    />
  );
};

export default Input;