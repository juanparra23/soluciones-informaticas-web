import React, { useState, useRef, useEffect } from 'react'
import Buttom from '../../Components/Atoms/Buttom'
import NavTitle from '../../Components/Atoms/NavTitle/Index'
import Navbutton from "@/Components/Atoms/Navbutton"

/* el alt: es para describir la imagen */

const Index = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className='fixed top-0 left-0 z-[1000] flex flex-row 
    w-full h-20 justify-between items-start bg-barraherramientas shadow-md'>

      <div className='w-50 h-40 flex justify-start items-start ml-5'>
        <img src='/logo-solo2.png' alt='Logo'/>
      </div>

      <div className='flex flex-row justify-between items-center gap-2 w-1/3'>
        <NavTitle title='Inicio' link="/" />
        <NavTitle title="Nosotros" link="/Nosotros" />
        <NavTitle title="Servicios" link="/Servicios" />
      </div>

      <div className='flex flex-col relative' ref={menuRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Navbutton title='Productos'/>                    
        </button>

        {isOpen && (
          <div className='absolute right-0 top-full mt-2 
            bg-barraherramientas shadow-2xl
            w-60 rounded-md p-2'
          >
            <div onClick={() => setIsOpen(false)}>
              <NavTitle title="Camaras" link="/Productos/camaras"/>
            </div>

            <div onClick={() => setIsOpen(false)}>
              <NavTitle title="Tintas" link="/Productos/tintas"/>
            </div>

            <div onClick={() => setIsOpen(false)}>
              <NavTitle title="Toners" link="/Productos/toners"/>
            </div>

            <div onClick={() => setIsOpen(false)}>
              <NavTitle title="Impresoras" link="/Productos/impresoras"/>
            </div>

            <div onClick={() => setIsOpen(false)}>
              <NavTitle title="Computadores" link="/Productos/computadores"/>
            </div>
          </div>
        )}
      </div>

      <div className='h-20 flex justify-center items-center mr-5'>
        <Buttom link='/Admin/Login' title='Iniciar Sesion'/>
      </div>

    </nav>
  )
}

export default Index
