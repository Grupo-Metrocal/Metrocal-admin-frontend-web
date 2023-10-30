'use client'
import { CButton } from '@/components/CButton'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import { fetchData } from '@/utils/fetch'
import { getCookie, setCookie } from 'cookies-next'
import { toast } from 'sonner'
export const Profile = () => {
  const { values, handleInputChange } = useForm({
    username: getCookie('username') as string,
  })

  const handleUpdateProfile = async () => {
    const response = await fetchData({
      url: `users/profile/${getCookie('token')}`,
      method: 'PUT',
      body: {
        username: values.username,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    if (response.success) {
      toast.success('Perfil actualizado', {
        description: 'Se actualizo correctamente el perfil',
      })
      setCookie('username', values.username)
    } else {
      toast.error('Error al actualizar el perfil', {
        description: response.message | response.details,
      })
    }
  }

  return (
    <div className="profile-edit">
      <CInput
        label="Nombre de usuario"
        value={values.username}
        type="text"
        required
        name="username"
        onChange={(e) => handleInputChange(e)}
      />

      <CButton
        widht="full"
        className="mt-4"
        uppercase={true}
        onClick={handleUpdateProfile}
      >
        Guardar
      </CButton>
    </div>
  )
}
