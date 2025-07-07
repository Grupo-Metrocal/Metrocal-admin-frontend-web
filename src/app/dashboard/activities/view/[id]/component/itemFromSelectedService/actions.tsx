import { Modal } from "@/components/Modal"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { ChangeCertCode } from "../changeCertCode"
import { AlertDialogModal } from "@/components/AlertDialogModal"
import { EquipmentQuoteRequest } from '../../interface'

interface IPropsActions {
  equipment: any
  calibration_method: string
  activityID: number
  onDelete: (id: number, stackId: number) => void
  stackId: number
  selectedService: EquipmentQuoteRequest | null
}
export const ActionItem = ({
  equipment,
  activityID,
  calibration_method,
  onDelete,
  stackId,
  selectedService
}: IPropsActions) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border">
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
        <DropdownMenuItem>
          <Link
            href={`/dashboard/activities/view/update/${equipment.id}/${calibration_method}/${activityID}/${selectedService?.id}?increase=false?`}
          >
            Modificar Resultados
          </Link>
        </DropdownMenuItem>

        <div className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Modal
            title='Reemplazar código de certificado'
            description='Al utilizar un codigo alternativo de otro metodo, este sera reemplazado'
            nameButton='Reemplazar código de certificado'
            Component={() => <ChangeCertCode calibration_method={calibration_method} current_certficate_code={equipment.certificate_code} equipment_id={equipment.id} />}
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()

          }}
        >
          <AlertDialogModal
            nameButton="Eliminar equipo"
            onConfirm={() => onDelete(equipment.id, stackId)}
            title="¿Estas seguro de querer eliminar este equipo?"
            description="Al eliminar este equipo no podras recuperar la información"
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
