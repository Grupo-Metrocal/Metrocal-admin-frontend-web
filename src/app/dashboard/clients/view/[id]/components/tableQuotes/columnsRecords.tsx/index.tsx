import { AlertDialogModal } from '@/components/AlertDialogModal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { IClientsQuoteRecordsTable } from '../records'
import { formatDate } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'
import Link from 'next/link'

type IColumns = {
  onDelete: (id: number) => void
}

export const ColumnsCertifiedRecords = ({
  onDelete,
}: IColumns): ColumnDef<IClientsQuoteRecordsTable>[] => {
  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
    //       aria-label="Selccionar todo"
    //     />
    //   ),

    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Seleccionar"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'no',
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-left"
          >
            No. Cotización
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="capitalize text-left">{row.getValue('no')}</div>
      },
    },
    {
      accessorKey: 'total_price',
      header: () => <div className="text-center">Total</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {formatPrice(row.getValue('total_price'))}
        </div>
      ),
    },

    {
      accessorKey: 'approved_by',
      header: () => <div className="text-center">Aprobado por</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('approved_by')
            ? row.getValue('approved_by')
            : 'Sin aprobar'}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => (
        <div
          className="text-center"
          style={{
            color:
              row.getValue('status') === 'pending de revisión'
                ? '#f7c948'
                : row.getValue('status') === 'done'
                ? '#34d399'
                : '#f7c948',
            fontWeight: 'bold',
            borderRadius: '0.25rem',
          }}
        >
          {row.getValue('status') === 'pending'
            ? 'Pendiente'
            : row.getValue('status') === 'done'
            ? 'Aprobado'
            : 'Pendiente de aprobación'}
        </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: () => <div className="text-center">Fecha</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {formatDate(row.getValue('created_at'))}
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
                <Link href={`/dashboard/quotes/view/${payment.id}`}>
                  Ver cotización
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Linking
                  href={`/dashboard/activities/view/${payment.activity_id}`}
                >
                  Detalles de actividad
                </Linking>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                style={{
                  color: 'tomato',
                  fontWeight: 'bold',
                }}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <AlertDialogModal
                  nameButton="Eliminar cotización"
                  title="¿Estás seguro de eliminar esta registro?"
                  onConfirm={() => onDelete(payment.id)}
                  description="Al eliminar estos registros se eliminaran todos los datos relacionados a ella, como sus actividades, calibraciones realizadas, certificados asociados, etc."
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
      },
    },
  ]
}
