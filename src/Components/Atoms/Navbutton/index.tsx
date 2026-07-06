import React from 'react'
interface Indexprops {
    title : string
}

const index = ({title="Ttile"}: Indexprops) => {
  return (
    <div className='flex items-center h-20 text-amber-50 hover:text-textoprincipal cursor-pointer  hover:border-b-2 hover:border-violet-600'>
      <h1 className='text-[15px] font-medium'>{title}</h1>
    </div>
  )
}

export default index
