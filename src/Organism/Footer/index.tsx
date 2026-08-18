import FooterColumn from "@/Components/Molecules/FooterColumn"
import FooterLink from "@/Components/Atoms/FooterLink"
import FooterText from "@/Components/Atoms/FooterText"

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-18">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Empresa */}
          <FooterColumn title="Soluciones Informáticas">
            <FooterText>
              Brindamos soluciones tecnológicas en cámaras de seguridad,
              impresoras, redes y soporte técnico profesional en Urabá.
            </FooterText>
          </FooterColumn>

          {/* Servicios */}
          <FooterColumn title="Servicios">
            <FooterLink href="/Productos/camaras">Cámaras</FooterLink>
            <FooterLink href="/Productos/impresoras">Impresoras</FooterLink>
            <FooterLink href="/Productos/computadores">Computadores</FooterLink>
            <FooterLink href="/Productos/toners">Tóner</FooterLink>
          </FooterColumn>

          {/* Empresa */}
          <FooterColumn title="Empresa">
            <FooterLink href="/">Inicio</FooterLink>
            <FooterLink href="/Nosotros">Nosotros</FooterLink>
            <FooterLink href="/Servicios">Servicios</FooterLink>
            <FooterLink href="/Admin/Login">Admin</FooterLink>
          </FooterColumn>

          {/* Contacto */}
          <FooterColumn title="Contacto">
            <FooterText>📍 Apartado, Antioquia</FooterText>
            <FooterText>📞 313 795 5864</FooterText>
            <FooterText>✉solucionesinformaticas45@gmail.com</FooterText>
          </FooterColumn>
          
          <FooterColumn title="Ubicanos">
            <FooterLink href="">🛡️ingrese con total tranquilidad que esta protegido </FooterLink>

          </FooterColumn>
          

        </div>

        {/* Línea inferior */}
        <div className="mt-14 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Soluciones Informáticas. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  )
}
