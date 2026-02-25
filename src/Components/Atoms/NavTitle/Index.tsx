import React from 'react'
import Link from 'next/link';
import { link } from 'fs';
//#3B82F6--#7C3AED
/* esto es para definir las propiedades del componente */
interface Indexprops{

   title: string;
   link: string;
}

const index = ({title = "Title", link = "/"}: Indexprops) => {
  return (

    <Link href={link}>
        <div className='h-20 flex  justify-center text-gray-500  items-center hover:text-textoprincipal cursor-pointer  hover:border-b-2 hover:border-violet-600  '>
            <h1 className='text-sm font-normal '>{title}</h1>
        </div>
    </Link>



  )
}

export default index