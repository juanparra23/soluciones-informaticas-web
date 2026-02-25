import React from 'react'

const index = ({src, alt}: {src: string, alt: string}) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-md'>
      <img src={src}  className='w-40 h-40 object-cover rounded-lg' />
    </div>
  )
}

export default index
{}