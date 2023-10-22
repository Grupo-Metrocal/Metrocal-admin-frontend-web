import Image from 'next/image'
import usersIcon from '@/assets/icons/users.svg'
import quotesIcon from '@/assets/icons/quotes.svg'
import { Modal } from '@/components/Modal'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { ItemListUser } from './ItemListUser'
import { getCookie } from 'cookies-next'
import { setUsers } from '@/redux/features/user/usersSlice'
import { deleteUserFromRole } from '@/redux/features/user/rolesSlice'
import { deleteUser } from '@/utils/functions'

export const ListUsers = () => {
  const users = useAppSelector((state) => state.users.users)
  const roles = useAppSelector((state) => state.roles.roles)

  const dispatch = useAppDispatch()

  const handleDeleteUser = async (id: number) => {
    const token = getCookie('token')
    const response = await deleteUser(id, token as string)

    if (response) {
      const newUsers = users.filter((user) => user.id !== id)
      const userDeleted = users.find((user) => user.id === id)

      dispatch(setUsers(newUsers))
      dispatch(deleteUserFromRole({ user: userDeleted }))
    }
  }

  return (
    <div className="users-content ">
      <header className="users-content-header">
        <h4>Todos los colaboradores</h4>

        <div className="users-content-header-info">
          <div className="users">
            <Image src={usersIcon} alt="users" />
            <span>{users.length} Miembros</span>
          </div>
          <div className="activities">
            <Image src={quotesIcon} alt="quotes" />
            <span>0 Actividades</span>
          </div>
        </div>

        <div className="users-content-header-actions">
          <Modal
            buttonStyle={{
              boxShadow: 'none',
              borderRadius: '10px',
            }}
            nameButton="Asignar actividad"
            className="c-button"
          />
        </div>
      </header>
      <div className="users-content-body">
        {users?.map((user) => (
          <ItemListUser
            key={user.id}
            user={user}
            handleDeleteUser={handleDeleteUser}
            roles={roles}
          />
        ))}
      </div>
    </div>
  )
}
