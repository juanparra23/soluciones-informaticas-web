import React from 'react'
interface Indexprops {
    title : string
}

const index = ({title="Ttile"}: Indexprops) => {
  return (
    <div className='flex items-center h-20 text-gray-500 hover:text-textoprincipal cursor-pointer  hover:border-b-2 hover:border-violet-600'>
      <h1 className='text-sm font-normal'>{title}</h1>
    </div>
  )
}

export default index
