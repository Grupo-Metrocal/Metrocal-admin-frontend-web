'use client'
import './page.scss'
import Link from 'next/link'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
import { useForm } from '@/hooks/useForm'
import mailIcon from '@/assets/icons/mail.svg'
import lockIcon from '@/assets/icons/lock.svg'
import Image from 'next/image'
import metrocalComplete from '@/assets/images/metrocal_completo.svg'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signin } from '@/services/auth'
import { setProfile } from '@/redux/features/profile'
import { useAppDispatch } from '@/redux/hook'

export default function Signin(): JSX.Element {
  const initialValues = {
    email: '',
    password: '',
  }

  const { values, handleInputChange } = useForm(initialValues)

  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.loading('Inicio de sesión en proceso...')

    const auth = await signin(values)

    toast.dismiss()

    if (auth) {
      toast.loading('Inicio de sesión exitoso', {
        description: 'Redireccionando al dashboard',
      })
      dispatch(setProfile(auth))
      router.push('/dashboard')
    } else {
      toast.error('Inicio de sesión fallido', {
        description: 'Verifica tus credenciales',
      })
    }
  }

  return (
    <div className="signin">
      <section className="signin-login">
        <header>
          <small>METROCAL</small>
          <h1>Iniciar Sesión.</h1>
          <p>Inicie sesión con los datos que ingresó durante su registro</p>
        </header>

        <form onSubmit={handleSubmit}>
          <CInput
            label="Email"
            type="email"
            className="signin-login__input__email"
            value={values.email}
            name="email"
            onChange={handleInputChange}
            icon={mailIcon}
            required
          />

          <CInput
            label="Contraseña"
            type="password"
            className="signin-login__input__password"
            value={values.password}
            name="password"
            onChange={handleInputChange}
            icon={lockIcon}
            required
          />

          <div className="signin-login__remember">
            <Link href="/">
              <small>Olvidastes tu contraseña?</small>
            </Link>
          </div>

          <CButton
            className="signin-login__button"
            type="submit"
            uppercase={true}
            widht="full"
          >
            Iniciar Sesión
          </CButton>

          <footer className="signin-login__privacy">
            <Link href="/">
              <span>Politicas de privacidad</span>
            </Link>
            <span>Metrocal</span>
          </footer>
        </form>
      </section>
      <section className="signin-metrocal">
        <div className="signin-metrocal__image">
          <Image src={metrocalComplete} alt="metrocal" />
        </div>

        <div className="signin-metrocal__description">
          <p>
            <span>manteniendo la visión general</span>
            <small>
              No deberías hacer uso de inicio de sesión si no eres un empleado
              de Metrocal.
            </small>
          </p>
        </div>
      </section>

      <Toaster />
    </div>
  )
}
