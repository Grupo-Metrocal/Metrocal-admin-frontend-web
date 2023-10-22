import { CButton } from '@/components/CButton'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import { addUser, setUsers } from '@/redux/features/user/usersSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { IUser } from '../page'
import { addUserToRole } from '@/redux/features/user/rolesSlice'

export const CreateUsers = () => {
  const { values, handleInputChange } = useForm({
    username: '',
    email: '',
    password: '',
  })
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch()

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.loading('Creando usuario...')

    const response = await fetchData({
      url: 'users',
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      const user: IUser = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        image: response.data?.image,
        roles: response.data.roles,
      }

      dispatch(setUsers([...users, user]))
      dispatch(addUserToRole({ user }))
      toast.success('Usuario creado correctamente')
    } else {
      toast.error('Error al crear el usuario', {
        description: response.details,
      })
    }
  }

  return (
    <div className="create-user">
      <form onSubmit={handleCreateUser}>
        <CInput
          name="username"
          type="text"
          label="Nombre de usuario"
          onChange={(e) => handleInputChange(e)}
          value={values.username}
          required
        />
        <CInput
          name="email"
          type="email"
          label="Correo electrónico"
          onChange={(e) => handleInputChange(e)}
          value={values.email}
        />
        <CInput
          name="password"
          type="password"
          label="Contraseña"
          onChange={(e) => handleInputChange(e)}
          value={values.password}
        />

        <CButton className="mt-6" type="submit" widht="full" uppercase>
          Crear usuario
        </CButton>
      </form>
    </div>
  )
}
