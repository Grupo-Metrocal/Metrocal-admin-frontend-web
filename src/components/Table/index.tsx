'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FilterItem } from './filter'
import { useAppDispatch } from '@/redux/hook'
import { setRowSelectionTable } from '@/redux/features/data_table/rowSelection'

export type filter = {
  id: string
  label: string
  checked: boolean
  onChangeCheckbox: () => void
}

export type DataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  search_by: string
  searchValue: string
  handlePreviousPage: () => void
  handleNextPage: () => void
  currentPage: number
  handleSearch: (target: any) => void
  totalPages: number
  isLoading: boolean
  search_placeholder?: string
  filter_columns?: Record<string, string>
  filters?: filter[]
  onRowClick?: (row: T) => void
}
export function DataTableDemo<T>({
  data,
  columns,
  searchValue,
  handleSearch,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
  isLoading,
  search_placeholder,
  filter_columns,
  filters,
  onRowClick,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const distpatch = useAppDispatch()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    // get id of selected rows
    const selectedRows = table
      .getFilteredSelectedRowModel()
      .rows.map((row: any) => row.original.id)

    // dispatch to redux store
    distpatch(setRowSelectionTable(selectedRows))
  }, [rowSelection, distpatch, table])

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder={search_placeholder ?? 'Buscar'}
            value={searchValue}
            onChange={(e) => handleSearch(e.target)}
            className="w-full pr-8"
            name="search"
          />
          {isLoading && (
            <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-[#0199d4]" />
          )}
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          {filters && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filtros <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                style={{
                  backgroundColor: 'white',
                }}
              >
                {filters?.map((filter) => {
                  return (
                    <FilterItem
                      key={filter.id}
                      id={filter.id}
                      label={filter.label}
                      onChangeCheckbox={filter.onChangeCheckbox}
                      checked={filter.checked}
                    />
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {/*  */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Mostrar columnas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              style={{
                backgroundColor: 'white',
              }}
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      // className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {filter_columns?.[column.id] ?? column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] flex items-center justify-center rounded-md">
            <div className="flex items-center gap-2.5 bg-white shadow-lg rounded-xl px-4 py-2.5 border border-gray-100">
              <Loader2 className="h-4 w-4 animate-spin text-[#0199d4]" />
              <span className="text-sm font-medium text-gray-600">Cargando...</span>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={(e) => {
                    if (!onRowClick) return
                    const target = e.target as HTMLElement
                    if (target.closest('button, input, a, [role="checkbox"], [data-radix-collection-item]')) return
                    onRowClick(row.original)
                  }}
                  style={onRowClick ? { cursor: 'pointer' } : undefined}
                  className={onRowClick ? 'hover:bg-[#f0faff]' : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground text-gray-400">
          {/* {table.getFilteredSelectedRowModel().rows.length} de{' '} */}
          {/* {table.getFilteredRowModel().rows.length}{' '} */}
          {/* {data.length > 1 ? 'filas' : 'fila'} seleccionadas */}

          <span className="mx-2">
            Página {currentPage} de {totalPages}
          </span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
