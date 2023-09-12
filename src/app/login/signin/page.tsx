'use client'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
import { useForm } from '@/hooks/useForm'
export default function Signin(): JSX.Element {
  const initialValues = {
    email: '',
    password: '',
  }

  const { values, handleInputChange } = useForm(initialValues)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(values)
  }

  return (
    <div className="signin">
      <section className="signin-login">
        <header>
          <small>METROCAL</small>
          <h1>Iniciar Sesión.</h1>
          <p>Inicie sesion con los datos que ingresó durante su registro</p>
        </header>

        <form onSubmit={handleSubmit}>
          <CInput
            label="Email"
            type="email"
            className="signin-login__input__email"
            value={values.email}
            name="email"
            onChange={handleInputChange}
          />

          <CInput
            label="Contraseña"
            type="password"
            className="signin-login__input__password"
            value={values.password}
            name="password"
            onChange={handleInputChange}
          />

          <CButton className="signin-login__button" type="submit">
            Iniciar Sesión
          </CButton>
        </form>
      </section>
      <section className="signin-metrocal"></section>
    </div>
  )
}
