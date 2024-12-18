import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { emmitCertificationsToClient, Linking } from '@/utils/functions'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { ICertifiedRecordsTable } from '../records'
import { formatDate } from '@/utils/formatDate'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { toast } from 'sonner'

type IColumns = {
  onDelete: (id: number) => void
}

export const ColumnsCertifiedRecords = ({
  onDelete,
}: IColumns): ColumnDef<ICertifiedRecordsTable>[] => {
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
      accessorKey: 'client_company_name',
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
          <div className="capitalize text-center">
            {row.getValue('client_company_name')}
          </div>
        )
      },
    },
    {
      accessorKey: 'client_email',
      header: () => <div className="text-center">Correo del cliente</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('client_email')}</div>
      ),
    },
    {
      accessorKey: 'emited_date',
      header: () => <div className="text-center">Fecha de emisión</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue('emited_date'))

        return <div className="text-center">{formatDate(row.getValue('emited_date'))}</div>
      },
    },
    {
      accessorKey: 'emited_by',
      header: () => <div className="text-center">Revisado por</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('emited_by')}</div>
      ),
    },
    {
      accessorKey: 'issued_certificates',
      header: () => <div className="text-center">Certificados emitidos</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('issued_certificates')}</div>
      ),
    },
    {
      accessorKey: 'pending_certificates',
      header: () => <div className="text-center">Certificados pendientes</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('pending_certificates')}
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
                  href={`/dashboard/quotes/view/${payment.quote_request_id}`}
                >
                  Ver cotización
                </Linking>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Linking
                  href={`/dashboard/certificates/records/view/${payment.id}`}
                >
                  Detalles de certificados
                </Linking>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <AlertDialogModal
                  onConfirm={async () => {
                    toast.loading('Reenviando todos los certificados...', {
                      description: 'Esto puede tardar, porfavor espere...',
                      duration: 50000
                    })

                    const response = await emmitCertificationsToClient((payment.id as number) || 0)
                    toast.dismiss()

                    if (response.success) {
                      toast.success('Se han enviado todos los certificados')
                    } else {
                      toast.error('Hubo un error al enviar los certificados')
                    }
                  }}
                  title="Antes de reenviar todos los certificados, debe verificar que los datos sean correctos"
                  description="Una vez enviados los certificados se limpiaran los registros generados"
                  nameButton="Reenviar Certificados"
                  buttonStyle={{
                    fontWeight: 'bold',
                  }}
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
