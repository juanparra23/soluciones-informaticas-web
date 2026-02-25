import React, { useEffect, useRef, useState } from "react"
import IconNav from "@/Components/Atoms/IconNav"
import NavTitle from "@/Components/Atoms/MobileNavItem"

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const closeMenu = () => {
    setIsOpen(false)
    setProductsOpen(false)
  }

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div className="fixed top-0 left-0 z-[1000] flex w-full h-20 items-center justify-between px-4 bg-barraherramientas shadow-md">
      
      
      <div className="flex items-center w-44">
        <img src="/logo-solo2.png" alt="logo" className="h-12 w-auto" />
      </div>

      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-200"
      >
        <IconNav icon="material-symbols:menu-rounded" />
      </button>

      {isOpen && (
        <>
         
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu} />

          
          <div
            ref={panelRef}
            className="absolute right-4 top-20 w-[90%] max-w-sm rounded-2xl
                       bg-[#0B1220]/95 border border-white/10
                       shadow-2xl overflow-hidden
                       animate-[slideIn_0.3s_ease-out]"
          >
            
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <p className="text-white font-semibold">
                {productsOpen ? "Productos" : "Menú"}
              </p>

              <button onClick={closeMenu}>
                <IconNav icon="material-symbols:close-rounded" />
              </button>
            </div>

            <div className="p-3 flex flex-col gap-2">
              {!productsOpen ? (
                <>
                  <div onClick={closeMenu}>
                    <NavTitle title="Inicio" link="/"  />
                  </div>

                  {/* Productos */}
                  <button
                    onClick={() => setProductsOpen(true)}
                    className="w-full flex items-center justify-center px-4 py-4 rounded-xl
                               text-gray-200 hover:bg-white/5 active:bg-white/10 transition"
                  >
                    <span>Productos</span>
                    
                  </button>

                  <div onClick={closeMenu}>
                    <NavTitle title="Nosotros" link="/Nosotros"  />
                  </div>

                  <div onClick={closeMenu}>
                    <NavTitle title="Servicios" link="/Servicios"  />
                  </div>
                </>
              ) : (
                <>
                  {/* Volver */}
                  <button
                    onClick={() => setProductsOpen(false)}
                    className="w-full flex items-center gap-2 px-4 py-4 rounded-xl
                               text-gray-200 hover:bg-white/5 active:bg-white/10 transition"
                  >
                    <IconNav icon="material-symbols:chevron-left-rounded" />
                    Volver
                  </button>

                  <div onClick={closeMenu}>
                    <NavTitle title="Cámaras" link="/Productos/camaras"  />
                  </div>

                  <div onClick={closeMenu}>
                    <NavTitle title="Impresoras" link="/Productos/impresoras"  />
                  </div>

                  <div onClick={closeMenu}>
                    <NavTitle title="Computadores" link="/Productos/computadores"  />
                  </div>

                  <div onClick={closeMenu}>
                    <NavTitle title="Tóner" link="/Productos/toners"  />
                  </div>

                  <div onClick={closeMenu}>
                    <NavTitle title="Tintas" link="/Productos/tintas"  />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NavMobile