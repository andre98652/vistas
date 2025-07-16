import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { login as loginApi } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export default function Login() {
  const { register, handleSubmit, formState: { errors } } =
    useForm({ resolver: zodResolver(schema) })

  const { login } = useAuth()
  const navigate  = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await loginApi(data.email, data.password)
      login(res.data.token)        // guarda token en store
      navigate('/')               // va a Lista
    } catch {
      alert('Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

      <label className="block mb-2">
        <span className="text-sm">Correo</span>
        <input {...register('email')}
               className="border w-full p-2 rounded mt-1" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-sm">Contraseña</span>
        <input {...register('password')} type="password"
               className="border w-full p-2 rounded mt-1" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </label>

      <button type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Entrar
      </button>
    </form>
  )
}
