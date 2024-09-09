'use client'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { DataTableDemo } from '@/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Linking, deleteQuoteRequest, generateQuoteBasedOnCurrent } from '@/utils/functions'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { useForm } from '@/hooks/useForm'
import { handleGeneratePDFQuote } from '@/utils/downloadPDFQuote'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { quoteRecordsType } from '@/types/quoteRecords'
import { isDateOutOfRange } from '@/utils/isDateOutOfRange'
import { useRouter } from 'next/navigation'

interface IParamsGetRecords {
  page: number
  no?: string
  quoteRequestType?: string[]
}

const getRecords = async ({ page, no, quoteRequestType }: IParamsGetRecords) => {

  return await fetchData({
    url: `quotes/registered/all/${page}/10/${no}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
    params: {
      quoteRequestType,
    }
  })
}

export const RegisterQuoteList = () => {
  const [records, setRecords] = useState<quoteRecordsType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { values, handleInputChange } = useForm({
    search: '',
  })
  const [pagination, setPagination] = useState<any>({
    current_page: 0,
    total_pages: 0,
    total_data: 0,
  })

  const handleDeleteQuote = async (id: number) => {

    const response = await deleteQuoteRequest(id)

    if (response.success) {
      setRecords(records.filter((record: any) => record.id !== id))
    } else {
      toast.error('No se pudo eliminar la cotización')
    }
  }

  const handlePreviousPage = () => {
    if (pagination.current_page > 1) {
      setCurrentPage(pagination.current_page - 1)
    }
  }

  const handleNextPage = () => {
    if (pagination.current_page < pagination.total_pages) {
      setCurrentPage(pagination.current_page + 1)
    }
  }


  useEffect(() => {
    const timeOut = setTimeout(() => {
      getRecords({ page: currentPage, no: values.search })
        .then((data) => {
          if (data.success) {
            setRecords(data.data)
            setPagination({
              current_page: data.current_page,
              total_pages: data.total_pages,
              total_data: data.total_data,
            })
          } else {
            setRecords([])
            toast.error('No se pudieron cargar los registros')
          }
        })
        .finally(() => {
          toast.dismiss()
          setLoading(false)
        })
    }, 700)

    return () => clearTimeout(timeOut)
  }, [values.search, currentPage])

  useEffect(() => {
    toast.loading('Cargando registros...')

    getRecords({ page: currentPage })
      .then((data) => {
        if (data.success) {
          setRecords(data.data)
          setPagination({
            current_page: data.current_page,
            total_pages: data.total_pages,
            total_data: data.total_data,
          })
        } else {
          setRecords([])
          toast.error('No se pudieron cargar los registros')
        }
      })
      .finally(() => {
        toast.dismiss()
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {
        <DataTableDemo<quoteRecordsType>
          columns={columns({ onDelete: handleDeleteQuote })}
          searchValue={values.search}
          handleSearch={handleInputChange}
          data={records as any ?? []}
          search_by="no"
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={pagination.total_pages}
          isLoading={loading}
          search_placeholder="Buscar No. consecutivo de cotización"
          filter_columns={{
            client_company_name: 'Empresa',
            quote_request_no: 'No. de cotización',
            client_phone: 'Teléfono',
            quote_request_price: 'Precio',
            quote_request_created_at: 'Fecha de registro',
            approved_by: 'Aprobado por',
            quote_request_status: 'Estado',
          }}
        />
      }
    </div>
  )
}

type IColumns = {
  onDelete: (id: number) => void
}

const columns = ({
  onDelete,
}: IColumns): ColumnDef<quoteRecordsType>[] => {

  const router = useRouter()

  return [
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
          <div className="capitalize">
            {row.getValue('client_company_name')}
          </div>
        )
      },
    },
    {
      accessorKey: 'quote_request_no',
      header: () => <div className="text-right">No. de cotización</div>,
      cell: ({ row }) => (
        <div className="text-right">{row.getValue('quote_request_no')}</div>
      ),
    },
    {
      accessorKey: 'client_phone',
      header: () => <div className="text-right">Teléfono</div>,
      cell: ({ row }) => (
        <div className="text-right">{row.getValue('client_phone')}</div>
      ),
    },
    {
      accessorKey: 'quote_request_price',
      header: () => <div className="text-right">Precio</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('quote_request_price'))

        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price)

        return <div className="text-right">{formatted}</div>
      },
    },
    {
      accessorKey: 'quote_request_created_at',
      header: () => <div className="text-right">Fecha de registro</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue('quote_request_created_at'))

        const formmatted = date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

        return <div className="text-right">{formmatted}</div>
      },
    },
    {
      accessorKey: 'approved_by',
      header: () => <div className="text-right">Aprobado por</div>,
      cell: ({ row }) => (
        <div className="text-right">{row.getValue('approved_by')}</div>
      ),
    },
    {
      accessorKey: 'quote_request_status',
      header: () => <div className="text-right">Estado</div>,
      cell: ({ row }) => {
        const status: string = row.getValue('quote_request_status')
        return (
          <div
            style={{
              backgroundColor:
                status === 'done'
                  ? '#10B981'
                  : status === 'rejected'
                    ? 'tomato'
                    : status === 'canceled'
                      ? '#333333'
                      : status === 'pending'
                        ? '#F59E0B'
                        : status === 'waiting'
                          ? '#6B7280'
                          : 'gray',

              borderRadius: '5px',
              color: 'white',
              padding: '0.2rem 0.5rem',
              display: 'inline-block',
              float: 'right',
            }}
          >
            {status === 'done'
              ? 'Aprobado'
              : status === 'rejected'
                ? 'Rechazado'
                : status === 'canceled'
                  ? 'Cancelado'
                  : status === 'pending'
                    ? 'Pendiente'
                    : status === 'waiting'
                      ? 'En espera'
                      : 'Desconocido'
            }
          </div>
        )
      },
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
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(payment.id.toString())
                }
              >
                copiar ID de cotización
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Linking href={`/dashboard/quotes/view/${payment.id}`}>
                  Ver cotización
                </Linking>
              </DropdownMenuItem>
              {
                !((payment.quote_request_status === 'pending' || payment.quote_request_status === 'waiting') &&
                  isDateOutOfRange(payment.quote_request_created_at, 30))
                && (
                  <DropdownMenuItem>
                    <Linking href={`/dashboard/quotes/requests/${payment.id}?${payment.quote_request_status !== 'waiting' ? "increase=true" : "increase=false"}`}>
                      Actualizar cotización
                    </Linking>
                  </DropdownMenuItem>
                )
              }

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <AlertDialogModal
                  nameButton="Descargar PDF"
                  title="Descargar PDF"
                  description="La descarga del PDF se iniciará automáticamente."
                  onConfirm={() => handleGeneratePDFQuote({ id: payment.id, no: payment.quote_request_no, company_name: payment.client_company_name })}
                  useButton={false}
                />
              </DropdownMenuItem>

              {
                ((payment.quote_request_status === 'pending' || payment.quote_request_status === 'waiting') && isDateOutOfRange(payment.quote_request_created_at, 30)) && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <AlertDialogModal
                      nameButton="Generar Nueva Cotización"
                      title="Generar Nueva Cotización"
                      description="Se copiaran la informacion de esta cotización para generar una nueva"
                      onConfirm={async () => {
                        const response = await generateQuoteBasedOnCurrent(payment.id)

                        if (response.success) {
                          toast.success('Cotización generada correctamente')
                          router.push(`/dashboard/quotes/requests/${response.data.id}?increase=false`)
                        } else {
                          toast.error('Hubo un error al generar la nueva cotización', {
                            description: response.details
                          })
                        }
                      }}
                      useButton={false}
                    />
                  </DropdownMenuItem>
                )
              }

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
                  title="¿Estás seguro de eliminar esta cotización?"
                  onConfirm={() => onDelete(payment.id)}
                  description="Al eliminar esta cotización se eliminaran todos los datos relacionados a ella, como sus actividades, sus permisos, etc."
                  buttonStyle={{
                    color: 'tomato',
                    fontWeight: 'bold',
                  }}
                  useButton={false}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu >
        )
      },
    },
  ]
}
