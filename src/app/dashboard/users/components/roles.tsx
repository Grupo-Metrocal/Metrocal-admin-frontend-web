import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { IRole } from '../page'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import usersIcon from '@/assets/icons/users.svg'
import Image from 'next/image'

type Props = {
  roles: IRole[]
}
export const Roles = ({ roles }: Props) => {
  return (
    <div className="roles">
      <h4 className="pb-2 mt-2">Roles</h4>

      <div className="roles-content flex flex-col gap-2">
        {roles?.map((role) => (
          <ItemListRole key={role.id} role={role} />
        ))}
      </div>
    </div>
  )
}

const ItemListRole = ({ role }: { role: IRole }) => {
  return (
    <div className="roles-content-item-info bg-white flex justify-between align-middle py-2 pl-4 rounded-[7px] items-center">
      <span className="font-medium">{role.name}</span>

      <div className="roles-content-item-info-users flex gap-2 align-middle items-center">
        <span>{role.users.length}</span>
        <Image src={usersIcon} alt="users" />
        <ActionIRoles id={role.id} />
      </div>
    </div>
  )
}

type PropsRole = {
  id: number
}
export const ActionIRoles = ({ id }: PropsRole) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0
        rotate-90
        "
        >
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
        <DropdownMenuItem>Agregar usuario</DropdownMenuItem>
        <DropdownMenuItem>Ver usuarios</DropdownMenuItem>
        <DropdownMenuItem>Renombrar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
