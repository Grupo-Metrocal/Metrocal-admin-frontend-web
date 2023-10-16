'use client'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState, useMemo } from 'react'
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

export type IQuoteRequestRegistered = {
  id: number
  quote_request_status: string
  quote_request_price: number
  quote_request_created_at: string
  client_company_name: string
  approved_by: string
  client_phone: string
}

export const RegisterQuoteList = () => {
  const [data, setData] = useState<IQuoteRequestRegistered[]>([])
  const [nextExpiredFilter, setNextExpiredFilter] = useState(false)
  const [approvedFilter, setApprovedFilter] = useState(false)
  const [rejectedFilter, setRejectedFilter] = useState(false)
  const [canceledFilter, setCanceledFilter] = useState(false)
  const [expiredFilter, setExpiredFilter] = useState(false)

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

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchData({
        url: 'quotes/registered',
      })

      if (response) {
        setData(response)
      }
    }

    fetch()
  }, [])

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const date = new Date(item.quote_request_created_at)
      const now = new Date()
      const diff = Math.abs(now.getTime() - date.getTime())
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

      // Filtro para "Próximos a expirar"
      if (nextExpiredFilter) {
        if (days <= 15 && item.quote_request_status !== 'done') {
          return true
        }
      }

      // Filtro para "Aprobados"
      if (approvedFilter) {
        if (item.quote_request_status === 'done') {
          return true
        }
      }

      // Filtro para "Rechazados"
      if (rejectedFilter) {
        if (item.quote_request_status === 'rejected') {
          return true
        }
      }

      // Filtro para "Cancelados"
      if (canceledFilter) {
        if (item.quote_request_status === 'canceled') {
          return true
        }
      }

      // Filtro para "Expirados"
      if (expiredFilter) {
        if (days > 15 && item.quote_request_status !== 'done') {
          return true
        }
      }

      // Si no cumple con ningún filtro, se incluye cuando ninguno está marcado
      if (
        !nextExpiredFilter &&
        !approvedFilter &&
        !rejectedFilter &&
        !canceledFilter &&
        !expiredFilter
      ) {
        return true
      }

      // Si no cumple con ningún filtro, se excluye
      return false
    })
  }, [
    data,
    nextExpiredFilter,
    approvedFilter,
    rejectedFilter,
    canceledFilter,
    expiredFilter,
  ])

  return (
    <div>
      {
        <DataTableDemo<IQuoteRequestRegistered>
          columns={columns}
          data={filteredData}
          search_by="client_company_name"
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

const columns: ColumnDef<IQuoteRequestRegistered>[] = [
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
        <div className="capitalize">{row.getValue('client_company_name')}</div>
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
              status === 'done'
                ? '#10B981'
                : status === 'rejected'
                ? 'tomato'
                : 'gray',

            borderRadius: '5px',
            color: status === 'canceled' ? '#333' : 'white',
            padding: '0.2rem 0.5rem',
            display: 'inline-block',
            float: 'right',
          }}
        >
          {status === 'done'
            ? 'Aprobado'
            : status === 'rejected'
            ? 'Rechazado'
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
            <DropdownMenuItem>Ver cotización</DropdownMenuItem>
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
              onClick={() => {
                deleteQuoteRequest(payment.id)
              }}
            >
              Eliminar cotización
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
