import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Pattern } from "../_hooks/usePattern"
import { Modal } from "@/components/Modal"
import { UpdatePattern } from "./updatedPattern"
import { AlertDialogModal } from "@/components/AlertDialogModal"

interface IProps {
  pattern: Pattern
  updatePattern: (ìd: number, pattern: Pattern) => void
  deletePattern: (id: number) => void
  updatePatternStatus: (id: number) => void
}

export const Actions = ({ pattern, updatePattern, deletePattern, updatePatternStatus }: IProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><MoreHorizontal width={16} /> </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm font-semibold">
          <Modal
            nameButton="Actualizar Información"
            title={`Actulizar informacion del patron ${pattern.code}`}
            description="La nueva información establecida debe ser correcta, estos datos estaran apareciendo en los certificados de calibración"
            Component={() => <UpdatePattern pattern={pattern} updatePattern={updatePattern} />}
          />
        </div>
        <div className="px-2 py-1.5 text-sm font-semibold">
          <AlertDialogModal onConfirm={() => updatePatternStatus(pattern.id)} nameButton={pattern.status ? 'Inhabilitar Metodo' : 'Habilitar Metodo'} useButton={false}
            title="Cambiar estado del patron"
            description="Al inhabilitar el patron, este estara bloqueado para su seleccion durante la recoleccion de datos en la calibracion del equipo."
          />
        </div>
        <div className="px-2 py-1.5 text-sm font-semibold">
          <AlertDialogModal onConfirm={() => deletePattern(pattern.id)} nameButton="Eliminar patron" useButton={false} buttonStyle={{
            color: 'red'
          }}
            title="Eliminar patron"
            description="Al eliminar este patron, la información establecida en los certificados que contengan este patron se veran afectados."
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu >

  )
}