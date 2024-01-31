import { useState } from 'react'
import { fetchData } from '@/utils/fetch'
import { useAppDispatch } from '@/redux/hook'
import {
  addUserToRole,
  deleteUserFromRole,
} from '@/redux/features/user/rolesSlice'
import { addRole, removeRole } from '@/redux/features/user/usersSlice'
import type { IRole, IUser } from '../page'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { AlertDialogModal } from '@/components/AlertDialogModal'

type PropsModal = {
  onAssign: () => void
  roles: IRole[]
  user: IUser
}
export const AssingRole = ({ roles, user }: PropsModal) => {
  const [userRoles, setUserRoles] = useState(user.roles)

  const dispatch = useAppDispatch()

  const handleCheck = async (role: IRole) => {
    toast.loading('Cargando...')
    const exist = userRoles?.some((r: any) => r.id === role.id)

    if (!exist) {
      const response = await fetchData({
        url: `users/assign/${user.id}/role/${role.id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })

      toast.dismiss()
      if (response.success) {
        toast.success(
          `Has asignado el rol ${role.name} al usuario ${user.username}`,
        )
        dispatch(addRole({ user, role }))
        dispatch(addUserToRole({ user: { ...user, roles: [role] } }))
      } else {
        toast.error('Ha ocurrido un error', {
          description: 'Si el error persiste, contacta con el administrador',
        })
      }
    } else {
      const response = await fetchData({
        url: `users/remove/${user.id}/role/${role.id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })
      toast.dismiss()

      if (response.success) {
        toast.success(
          `Has eliminado el rol ${role.name} al usuario ${user.username}`,
        )
        dispatch(removeRole({ user, role }))
        dispatch(deleteUserFromRole({ user: { ...user, roles: [role] } }))
      } else {
        toast.error('Ha ocurrido un error', {
          description: 'Si el error persiste, contacta con el administrador',
        })
      }
    }

    toast.dismiss()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {roles.map((role) => (
          <div key={role.id} className="flex items-center gap-2">
            {role.name !== 'user' && (
              <AlertDialogModal
                useCheckbox={true}
                key={role.id}
                onConfirm={() => handleCheck(role)}
                id={role.name}
                nameCheckbox={role.name}
                checked={userRoles?.some((r: any) => r.id === role.id)}
                label={role.name}
                title="¿Estas seguro de querer cambiar los permisos de este usuario?"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
