import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
        px-6 py-3
        rounded-xl
        bg-blue-600 text-white
        font-semibold
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        active:scale-95
        transition-all
        focus:outline-none focus:ring-2 focus:ring-blue-400
        ${className}
      `}
    />
  );
};

export default Button;
