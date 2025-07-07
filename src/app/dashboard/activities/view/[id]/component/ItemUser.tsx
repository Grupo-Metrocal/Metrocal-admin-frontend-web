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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface IProps {
  member: TeamMember
  responsable: number
  activityID: number
  onDeleteUserFromActivity: (id: number) => void
  onChangeResponsable: (id: number) => void
}

export const ItemUser = ({
  member,
  responsable,
  onDeleteUserFromActivity,
  onChangeResponsable,
}: IProps) => {
  return (
    <div key={member.id} className="flex items-center space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{member.username.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-gray-900 text-sm truncate">
            {member.username.replace(".", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </h4>
          {member.id === responsable && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              Responsable
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{member.email}</p>
      </div>
      <ActionItemUser user={member} onDelete={onDeleteUserFromActivity} onChageResponsable={onChangeResponsable} />
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
        <Button variant="ghost" className="h-8 w-8 p-0 border">
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
