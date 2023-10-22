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
import { CButton } from '@/components/CButton'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { Modal } from '@/components/Modal'

type PropsUser = {
  user: IUser
  handleDeleteUser: (id: number) => void
  roles: IRole[]
}
export const ItemListUser = ({ user, handleDeleteUser, roles }: PropsUser) => {
  const [image, setImage] = useState(metrocalLogo)

  useEffect(() => {
    if (user.image) {
      setImage(user.image)
    }
  }, [user])

  return (
    <div className="user" key={user.id}>
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
            <small>{user.roles?.[0].name}</small>
          </div>
        </div>
        <div className="actions">
          <ActionItemUser
            id={user?.id}
            onDelete={handleDeleteUser}
            name={user?.username}
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
  id: number
  name?: string
  onDelete: (id: number) => void
  roles: IRole[]
}
export const ActionItemUser = ({
  id,
  name,
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
            nameButton="Asignar rol"
            title={`Asignar rol a ${name}`}
            description="Selecciona el rol que deseas asignar a este usuario"
            Component={() => <AssingRole roles={roles} onAssign={() => {}} />}
            size="md"
          />
        </DropdownMenuItem>
        <DropdownMenuItem>Asignar actividad</DropdownMenuItem>
        <DropdownMenuItem>Reestablecer contraseña</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          style={{
            color: 'tomato',
            fontWeight: 'bold',
          }}
          onClick={() => {
            onDelete(id)
          }}
        >
          Eliminar usuario
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type PropsModal = {
  onAssign: () => void
  roles: IRole[]
}
const AssingRole = ({ onAssign, roles }: PropsModal) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="roles">
        {roles.map((role) => (
          <Checkbox
            key={role.id}
            // label={role.name}
            value={role.name}
            className="w-full"
          />
        ))}
      </div>

      <CButton onClick={onAssign}>Asignar</CButton>
    </div>
  )
}
