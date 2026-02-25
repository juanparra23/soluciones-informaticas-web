import React from 'react'
import Link from 'next/link'
import { link } from 'fs'
import { title } from 'process'

interface Indexprops {
  link: string
  title : string
}
const index = ({link = "/", title="title" }: Indexprops) => {
  return (
    

    <Link href={link}>
      <button className='w-38 h-10 gradient3 text-textoprincipal items-center rounded-lg hover:scale-105 transition-transform cursor-pointer'>
          <div className=' text-sm font-bold'>{title}</div>
      </button>
    </Link>
  )
}

export default index