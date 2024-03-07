'use client'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { DataTableDemo, filter } from '@/components/Table'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Linking, deleteQuoteRequest } from '@/utils/functions'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import {
  deleteItemQuoteRequestRegisters,
  setQuoteRequest,
} from '@/redux/features/quote/quoteRequestSlice'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export type IQuoteRequestRegistered = {
  id: number
  quote_request_status: string
  quote_request_price: number
  quote_request_created_at: string
  client_company_name: string
  approved_by: string
  client_phone: string
}

export type IPagination = {
  limit: number
  offset: number
  status: string[]
  bussinesName: string
  maxPages: number
}

export const RegisterQuoteList = () => {
  const data = useAppSelector((state) => state.quoteRequest.data)
  const [nextExpiredFilter, setNextExpiredFilter] = useState(false)
  const [approvedFilter, setApprovedFilter] = useState(false)
  const [rejectedFilter, setRejectedFilter] = useState(false)
  const [canceledFilter, setCanceledFilter] = useState(false)
  const [expiredFilter, setExpiredFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(true)

  const [pagination, setPagination] = useState<IPagination>({
    limit: 10,
    offset: 1,
    status: [],
    bussinesName: '',
    maxPages: 0,
  })

  const dispatch = useAppDispatch()

  const filters: filter[] = [
    {
      id: 'next_expired',
      label: 'Próximos a expirar',
      checked: nextExpiredFilter,
      onChangeCheckbox: () => setNextExpiredFilter(!nextExpiredFilter),
    },
    {
      id: 'approved',
      label: 'Aprobados',
      checked: approvedFilter,
      onChangeCheckbox: () => setApprovedFilter(!approvedFilter),
    },
    {
      id: 'rejected',
      label: 'Rechazados',
      checked: rejectedFilter,
      onChangeCheckbox: () => setRejectedFilter(!rejectedFilter),
    },
    {
      id: 'canceled',
      label: 'Cancelados',
      checked: canceledFilter,
      onChangeCheckbox: () => setCanceledFilter(!canceledFilter),
    },
    {
      id: 'expired',
      label: 'Expirados',
      checked: expiredFilter,
      onChangeCheckbox: () => setExpiredFilter(!expiredFilter),
    },
  ]

  // const getCheckedFilters = (filters: filter[]) => {
  //   return filters.filter((filter) => filter.checked).map((filter) => filter.id)
  // }

  const getCheckedFilters = (filters: filter[]): string[] => {
    const checkedFilters = filters.filter((filter) => filter.checked)
    if (checkedFilters.length === 0) {
      return filters.map((filter) => filter.id)
    } else {
      return checkedFilters.map((filter) => filter.id)
    }
  }

  const handlePreviousPage = () => {
    if (pagination.offset > 1) {
      setPagination({ ...pagination, offset: pagination.offset - 1 })
      setRefresh((prev) => !prev)
    }
  }

  const handleNextPage = () => {
    if (pagination.offset < pagination.maxPages) {
      setPagination({ ...pagination, offset: pagination.offset + 1 })
      setRefresh((prev) => !prev)
    }
  }

  useEffect(() => {
    const fetchFromServer = async () => {
      setIsLoading(true)
      try {
        const URL = `quotes/registered/all?limit=${pagination.limit}&offset=${pagination.offset}&status=${pagination.status}&bussinesName=${pagination.bussinesName}`
        const response = await fetchData({
          url: URL,
        })

        if (response) {
          setPagination({ ...pagination, maxPages: response.total_pages })
          dispatch(setQuoteRequest(response.data))
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFromServer()
  }, [refresh])

  useEffect(() => {
    const status = getCheckedFilters(filters)
    setPagination({ ...pagination, status })
    setRefresh((prev) => !prev)
  }, [
    nextExpiredFilter,
    approvedFilter,
    rejectedFilter,
    canceledFilter,
    expiredFilter,
  ])

  // const filteredData = useMemo(() => {
  //   return data.filter((item) => {
  //     const date = new Date(item.quote_request_created_at)
  //     const now = new Date()
  //     const diff = Math.abs(now.getTime() - date.getTime())
  //     const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  //     // Filtro para "Próximos a expirar"
  //     if (nextExpiredFilter) {
  //       if (days <= 15 && item.quote_request_status !== 'done') {
  //         return true
  //       }
  //     }

  //     // Filtro para "Aprobados"
  //     if (approvedFilter) {
  //       if (item.quote_request_status === 'done') {
  //         return true
  //       }
  //     }

  //     // Filtro para "Rechazados"
  //     if (rejectedFilter) {
  //       if (item.quote_request_status === 'rejected') {
  //         return true
  //       }
  //     }

  //     // Filtro para "Cancelados"
  //     if (canceledFilter) {
  //       if (item.quote_request_status === 'canceled') {
  //         return true
  //       }
  //     }

  //     // Filtro para "Expirados"
  //     if (expiredFilter) {
  //       if (days > 15 && item.quote_request_status !== 'done') {
  //         return true
  //       }
  //     }

  //     // Si no cumple con ningún filtro, se incluye cuando ninguno está marcado
  //     if (
  //       !nextExpiredFilter &&
  //       !approvedFilter &&
  //       !rejectedFilter &&
  //       !canceledFilter &&
  //       !expiredFilter
  //     ) {
  //       return true
  //     }

  //     // Si no cumple con ningún filtro, se excluye
  //     return false
  //   })
  // }, [
  //   data,
  //   nextExpiredFilter,
  //   approvedFilter,
  //   rejectedFilter,
  //   canceledFilter,
  //   expiredFilter,
  // ])

  const deleteItemRegister = async (id: number) => {
    const response = await deleteQuoteRequest(id)

    if (response.success) return dispatch(deleteItemQuoteRequestRegisters(id))

    return false
  }

  return (
    <div>
      {
        <DataTableDemo<IQuoteRequestRegistered>
          columns={columns({ onDelete: deleteItemRegister })}
          data={data ? data : []}
          search_by="client_company_name"
          searchValue={pagination.bussinesName}
          setPagination={(event: { target: { value: any } }) => {
            setPagination({ ...pagination, bussinesName: event?.target?.value })
            setRefresh((prev) => !prev)
          }}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={pagination.offset}
          totalPages={pagination.maxPages}
          isLoading={isLoading}
          search_placeholder="Buscar por empresa"
          filter_columns={{
            client_company_name: 'Empresa',
            client_phone: 'Teléfono',
            quote_request_price: 'Precio',
            quote_request_created_at: 'Fecha de registro',
            approved_by: 'Aprobado por',
            quote_request_status: 'Estado',
          }}
          filters={filters as filter[]}
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
}: IColumns): ColumnDef<IQuoteRequestRegistered>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Selccionar todo"
        />
      ),

      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
          <div className="capitalize">
            {row.getValue('client_company_name')}
          </div>
        )
      },
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
                status === 'approved'
                  ? '#10B981'
                  : status === 'rejected'
                  ? 'tomato'
                  : status === 'expired'
                  ? '#808080'
                  : status === 'next_expired'
                  ? '#FFD700'
                  : '#333333',

              borderRadius: '5px',
              color: 'white',
              padding: '0.2rem 0.5rem',
              display: 'inline-block',
              float: 'right',
            }}
          >
            {status === 'approved'
              ? 'Aprobado'
              : status === 'rejected'
              ? 'Rechazado'
              : status === 'expired'
              ? 'Expirado'
              : status === 'next_expired'
              ? 'Próximo a expirar'
              : 'Cancelado'}
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
              <DropdownMenuItem>
                <Linking href={`/dashboard/quotes/requests/${payment.id}`}>
                  Actualizar cotización
                </Linking>
              </DropdownMenuItem>
              <DropdownMenuItem>Enviar recordatorio</DropdownMenuItem>
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
          </DropdownMenu>
        )
      },
    },
  ]
}
