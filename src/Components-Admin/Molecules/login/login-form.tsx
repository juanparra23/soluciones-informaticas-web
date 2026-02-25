import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "@/lib/supabaseClient"

import { cn } from "@/lib/utils"
import { Button } from "@/Components-Admin/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components-Admin/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/Components-Admin/ui/field"
import { Input } from "@/Components-Admin/ui/input"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    router.push("/Admin")
  }

  const handleGoogle = async () => {
    setLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/Admin/Productos`,
      },
    })

    setLoading(false)

    if (error) setErrorMsg(error.message)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para iniciar sesión
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email-Usuario</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                </div>

                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {errorMsg && (
                <FieldDescription className="text-red-500">
                  {errorMsg}
                </FieldDescription>
              )}

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Ingresando..." : "Login"}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={handleGoogle}
                  disabled={loading}
                >
                  {loading ? "Abriendo Google..." : "Login con Google"}
                </Button>

                <FieldDescription className="text-center">
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    className="underline"
                    onClick={() => router.push("/Admin/Signup")}
                  >
                    Sign up
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
