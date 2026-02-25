import React from 'react'
import { HeroTitle, HeroTitle2, Subtext2} from "@/Components/Atoms/Titles"
import Buttom from "@/Components/Atoms/Buttom"

const index = () => {
  return (
    <div className='flex flex-col gap-1.5 mt-0'>
      <div>
        <HeroTitle />
      </div>

      <div>
        <HeroTitle2 text2="para tu Empresa " />
      </div>

      <div>
        <Subtext2 title="Camaras, redes, soporte tecnico y tecnologia confiable"/>
      </div>
    
    </div>
  );
};

export default index;
