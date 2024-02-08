import './index.scss'
import Image from 'next/image'
import type { TeamMember } from '../interface'
import metrocalLogo from 'public/metrocal.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

interface IProps {
  user: TeamMember
  responsable: number
  activityID: number
  onDeleteUserFromActivity: (id: number) => void
  onChangeResponsable: (id: number) => void
}

export const ItemUser = ({
  user,
  responsable,
  onDeleteUserFromActivity,
  onChangeResponsable,
}: IProps) => {
  return (
    <div className="activity-viewer__personal-item">
      <div className="activity-viewer__personal-item__image">
        <Image
          src={user.imageURL || metrocalLogo}
          width={50}
          height={50}
          alt={user.username + ' image'}
        />

        <div className="activity-viewer__personal-item__info">
          <span
            className={`flex items-center ${
              responsable === user.id ? 'font-bold ' : ''
            }
          `}
          >
            {user.username} {responsable === user.id && '(Responsable)'}
          </span>
          <span>{user.email}</span>
        </div>
      </div>

      <div className="activity-viewer__personal-item__actions">
        <ActionItemUser
          user={user}
          onDelete={onDeleteUserFromActivity}
          onChageResponsable={onChangeResponsable}
        />
      </div>
    </div>
  )
}

interface PropsActionItemUser {
  user: TeamMember
  onDelete: (id: number) => void
  onChageResponsable: (id: number) => void
}

export const ActionItemUser = ({
  user,
  onDelete,
  onChageResponsable,
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
          <AlertDialogModal
            nameButton="Cambiar a responsable"
            onConfirm={() => onChageResponsable(user.id)}
            title="¿Estas seguro de querer cambiar el rol de este usuario?"
            description="Al aceptar, este usuario sera el responsable de la actividad."
            useButton={false}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <AlertDialogModal
            nameButton="Eliminar de la actividad"
            onConfirm={() => onDelete(user.id)}
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
