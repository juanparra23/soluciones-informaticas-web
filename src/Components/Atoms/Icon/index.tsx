import React from 'react'
import {Icon} from '@iconify/react';


const index = ({icon} : {icon : string} ) => {
  return (
  <div className='flex flex-col items-center justify-center gradient rounded-full w-full h-full p-4 shadow-lg'>
    <Icon icon={`${icon}`} width="40" height="40" className='text-shadow-textoprincipal' />
  </div>
    

  );
};

export default index;
