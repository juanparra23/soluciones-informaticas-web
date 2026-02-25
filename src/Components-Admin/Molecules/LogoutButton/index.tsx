import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/router"
import { Button } from "@/Components-Admin/ui/button"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/Admin/Login")
  }

  return (
    <Button variant="outline" type="button" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  )
}
