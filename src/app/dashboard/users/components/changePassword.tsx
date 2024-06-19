import { CButton } from "@/components/CButton"
import { CInput } from "@/components/CInput"
import { useForm } from "@/hooks/useForm"
import { fetchData } from "@/utils/fetch"
import { toast } from "sonner"
import { getCookie } from "cookies-next"

interface IProps {
  id: number
}

export const ChangePassword = ({ id }: IProps) => {
  const { values, handleInputChange, reset } = useForm({
    password: '',
  })

  const handleSubmit = async () => {
    toast.loading('Cambiando contraseña...')

    const response = await fetchData({
      url: 'users/change-password',
      method: 'POST',
      body: {
        id,
        password: values.password,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      }
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Has cambiado la contraseña exitosamente.')
      reset()
    } else {
      toast.error('Error al cambiar contraseña', {
        description: 'Por favor, intenta de nuevo.'
      })
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <CInput
        label="Nueva contraseña"
        required
        type="string"
        name="password"
        value={values.password}
        onChange={handleInputChange}
      />

      <CButton
        type="submit"
        className="mt-4"
        onClick={handleSubmit}
      >
        Cambiar contraseña
      </CButton>

    </form>
  )
}