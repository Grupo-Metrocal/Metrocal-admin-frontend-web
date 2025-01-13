import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Linking } from '@/utils/functions'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { IServicesOrderRecords } from '../records'
import { formatDate } from '@/utils/formatDate'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { handleGeneratePDFQuote, handleGeneratePDFServiceOrder } from '@/utils/downloadPDFQuote'

type IColumns = {
  onDelete: (id: number) => void
}

export const ColumnsServicesOrders = ({
  onDelete,
}: IColumns): ColumnDef<IServicesOrderRecords>[] => {
  return [
    {
      accessorKey: 'no',
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            No. Cotización
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue('no')}</div>
        )
      },
    },

    {
      accessorKey: 'client_name',
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Empresa
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="capitalize">
            {row.getValue('client_name')}
          </div>
        )
      },
    },
    {
      accessorKey: 'end_date',
      header: () => <div className="text-center">Fecha de finalización</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('end_date')}</div>
      ),
    },
    {
      accessorKey: 'services_order_quantity',
      header: () => <div className="text-center">Ordenes de Servicios</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('services_order_quantity')}</div>
      ),
    },
    {
      accessorKey: 'resposable',
      header: () => <div className="text-center">Responsable de actividad</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('resposable')}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original

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
              <DropdownMenuItem>
                <Linking
                  href={`/dashboard/service-order/view/${payment.id}`}
                >
                  Ver ordenes de servicio
                </Linking>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <AlertDialogModal
                  nameButton="Descargar Cotización"
                  title="Descargar Cotización"
                  description="La descarga del PDF se iniciará automáticamente."
                  onConfirm={() => handleGeneratePDFQuote({ id: payment.quote_request_id, no: payment.no, company_name: payment.client_name })}
                  useButton={false}
                />
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              {/* <DropdownMenuItem
                style={{
                  color: 'tomato',
                  fontWeight: 'bold',
                }}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <AlertDialogModal
                  nameButton="Eliminar registro"
                  title="¿Estás seguro de eliminar esta registro?"
                  onConfirm={() => onDelete(payment.id)}
                  description="Al eliminar estos registros se eliminaran todos los datos relacionados a ella, como sus actividades, calibraciones realizadas, certificados asociados, etc."
                  buttonStyle={{
                    color: 'tomato',
                    fontWeight: 'bold',
                  }}
                  useButton={false}
                />
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
