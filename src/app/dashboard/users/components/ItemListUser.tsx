import { useState, useEffect } from 'react'
import type { IRole, IUser } from '../page'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

import metrocalLogo from 'public/metrocal.svg'
import Image from 'next/image'
import { Modal } from '@/components/Modal'
import { useAppDispatch } from '@/redux/hook'
import {
  addUserToRole,
  deleteUserFromRole,
} from '@/redux/features/user/rolesSlice'
import { addRole, removeRole } from '@/redux/features/user/usersSlice'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'

type PropsUser = {
  user: IUser
  handleDeleteUser: (id: number) => void
  roles: IRole[]
}
export const ItemListUser = ({ user, handleDeleteUser, roles }: PropsUser) => {
  const [image, setImage] = useState(user.imageURL || metrocalLogo)
  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    if (user.imageURL) {
      setImage(user.imageURL)
    }

    const roleWithMinPriority = user.roles?.reduce(
      (prev: any, current: any) => {
        return prev.priority < current.priority ? prev : current
      },
    )

    setCurrentUser({ ...user, roles: [roleWithMinPriority] })
  }, [user])

  return (
    <div className="user" key={user.id}>
      <div className="user-info">
        <div className="user-info-name">
          <Image
            src={image}
            alt="user"
            width={50}
            height={50}
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              objectFit: 'cover',
            }}
          />
          <div className="user-info-name-text">
            <span
              className="
                overflow-hidden
                whitespace-nowrap
                overflow-ellipsis
                w-[150px]
                "
              title={user.username}
            >
              {user.username}
            </span>
            {
              <small>
                {currentUser.roles?.map((role: any) => role.label).join(', ') ||
                  'Sin rol asignado'}
              </small>
            }
          </div>
        </div>
        <div className="actions">
          <ActionItemUser
            onDelete={handleDeleteUser}
            user={user}
            roles={roles}
          />
        </div>
      </div>

      <div
        className="user-email
      overflow-hidden
      whitespace-nowrap
      overflow-ellipsis
      "
        title={user.email}
      >
        {user.email}
      </div>
    </div>
  )
}

type PropsActionItemUser = {
  user: IUser
  onDelete: (id: number) => void
  roles: IRole[]
}
export const ActionItemUser = ({
  user,
  onDelete,
  roles,
}: PropsActionItemUser) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{
          backgroundColor: 'white',
        }}
      >
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <Modal
            nameButton="Editar permisos"
            title={`Editar permisos de ${user.username}`}
            description="Aqui puedes editar los permisos de este usuario, recuerda que los permisos de administrador no se pueden editar."
            Component={() => (
              <AssingRole roles={roles} onAssign={() => {}} user={user} />
            )}
            size="xl"
          />
        </DropdownMenuItem>
        <DropdownMenuItem>Asignar actividad</DropdownMenuItem>
        <DropdownMenuItem>Reestablecer contraseña</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <AlertDialogModal
            nameButton="Eliminar usuario"
            onConfirm={() => {
              onDelete(user.id)
            }}
            title="¿Estas seguro de querer eliminar este usuario?"
            description="Al eliminar este usuario, se eliminaran todos los datos relacionados a el, como sus actividades, sus permisos, etc."
            buttonStyle={{
              color: 'tomato',
              fontWeight: 'bold',
            }}
            useButton={false}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type PropsModal = {
  onAssign: () => void
  roles: IRole[]
  user: IUser
}
const AssingRole = ({ roles, user }: PropsModal) => {
  const [userRoles, setUserRoles] = useState(user.roles)

  const dispatch = useAppDispatch()

  const handleCheck = async (role: IRole) => {
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
