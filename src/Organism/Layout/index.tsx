import React, { ReactNode } from 'react'
import Nav from "@/Organism/Nav"
import NavMobile from "@/Organism/NabMovile"
import WhatsAppFloat from '@/Components/Molecules/WhatsAppFloat';
import Footer from "@/Organism/Footer"

//el block quiere decir que muestra un bloque cuando esta en dimensiones 
// "md: 448px"y apartir de de 788px se oculta y para el nav es todo lo contrario *//


const index = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="block md:hidden">
        <NavMobile />
      </div>

      <div className="hidden md:block">
        <Nav />
      </div>

      <div className="pt-20">{children}</div>

     
      <Footer />

     
     <WhatsAppFloat
      phone="573137955864"
      message="Hola, estoy interesado en sus servicios."
      />
      
    </div>
  )
}

export default index
