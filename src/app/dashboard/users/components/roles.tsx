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
import { useEffect, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
import { renameLabel } from '@/redux/features/user/rolesSlice'
import { useAppDispatch } from '@/redux/hook'
import { Modal } from '@/components/Modal'
import { toast } from 'sonner'

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
      <span className="font-medium">{role.label ? role.label : role.name}</span>

      <div className="roles-content-item-info-users flex gap-2 align-middle items-center">
        <span>{role.users.length}</span>
        <Image src={usersIcon} alt="users" />
        <ActionIRoles role={role} />
      </div>
    </div>
  )
}

type PropsRole = {
  role: IRole
}
export const ActionIRoles = ({ role }: PropsRole) => {
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
        {/* <DropdownMenuItem>Agregar usuario</DropdownMenuItem> */}
        <DropdownMenuItem>Ver usuarios</DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          <Modal
            // Component={() => <RenameRole role={role} />}
            nameButton="Renombrar"
            title="Renombrar rol"
            description="Todos los usuarios que tengan este rol se verán afectados"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const RenameRole = ({ role }: { role: IRole }) => {
  const { values, handleInputChange } = useForm({
    label: role.label,
  })

  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast.success(`Has renombrado el rol ${role.name} a ${values.label}`)
    dispatch(renameLabel({ id: role.id, label: values.label }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <CInput
        label="Cambie el nombre del rol"
        name="label"
        value={values.label}
        onChange={handleInputChange}
      />

      <CButton type="submit" className="mt-4" widht="full">
        Guardar
      </CButton>
    </form>
  )
}
