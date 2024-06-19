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
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { AssingRole } from './AssingRole'
import { ChangePassword } from './changePassword'

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
              <AssingRole roles={roles} onAssign={() => { }} user={user} />
            )}
            size="xl"
          />
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Asignar actividad</DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <Modal
            nameButton="Reestablecer contraseña"
            title={`Reestablecer contraseña de ${user.username}`}
            description='Recuerda guardar la nueva contraseña y compartirlo con el usuario de manera segura.'
            Component={() => <ChangePassword id={user.id} />}
          />
        </DropdownMenuItem>
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
