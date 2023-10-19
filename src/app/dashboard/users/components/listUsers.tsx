import { useState, useEffect } from 'react'
import type { IUser } from '../page'
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
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import usersIcon from '@/assets/icons/users.svg'
import quotesIcon from '@/assets/icons/quotes.svg'
import { Modal } from '@/components/Modal'

type Props = {
  users: IUser[]
}
export const ListUsers = ({ users }: Props) => {
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
          <ItemListUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

type PropsUser = {
  user: IUser
  onClick?: () => void
}
export const ItemListUser = ({ user, onClick }: PropsUser) => {
  const [image, setImage] = useState(metrocalLogo)

  useEffect(() => {
    if (user.image) {
      setImage(user.image)
    }
  }, [user])

  return (
    <div className="user">
      <div className="user-info">
        <div className="user-info-name">
          <Image src={image} alt="user" width={50} height={50} />
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
            <small>{user.roles[0].name}</small>
          </div>
        </div>
        <div className="actions">
          <ActionItemUser />
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

export const ActionItemUser = () => {
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
        <DropdownMenuItem>Asignar rol</DropdownMenuItem>
        <DropdownMenuItem>Asignar actividad</DropdownMenuItem>
        <DropdownMenuItem>Reestablecer contraseña</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          style={{
            color: 'tomato',
            fontWeight: 'bold',
          }}
        >
          Eliminar usuario
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
