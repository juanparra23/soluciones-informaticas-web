import React from 'react'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ className = "", children, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={`
        w-full px-4 py-3
        rounded-xl
        border border-gray-300
        bg-white text-gray-900
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
        transition
        ${className}
      `}
    >
      {children}
    </select>
  );
};

export default Select;