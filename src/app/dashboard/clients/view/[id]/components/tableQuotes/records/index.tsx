import { DataTableDemo } from '@/components/Table'
import { ColumnsCertifiedRecords } from '../columnsRecords.tsx'

interface IProps {
  records: any[]
  currentPage: number
  pagination: {
    current_page: number
    total_pages: number
    total_data: number
  }
  setCurrentPage: any
  handleDeleteQuote: (id: number) => void
  loading: boolean
}

export type IClientsQuoteRecordsTable = {
  id: number
  total_price: string
  approved_by: string
  no: string
  status: string
  created_at: string
  activity_id: number
}

export const ClientQuoteRecords = ({
  records,
  currentPage,
  pagination,
  setCurrentPage,
  loading,
  handleDeleteQuote,
}: IProps) => {
  const handlePreviousPage = () => {
    if (pagination.current_page > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (pagination.current_page < pagination.total_pages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      {
        <DataTableDemo<IClientsQuoteRecordsTable>
          columns={ColumnsCertifiedRecords({ onDelete: handleDeleteQuote })}
          searchValue={''}
          data={records ?? []}
          search_by="client_company_name"
          setPagination={(event: { target: { value: any } }) => {
            setCurrentPage(event.target.value)
          }}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={pagination.total_pages}
          isLoading={loading}
          search_placeholder="Buscar nombre de client"
          filter_columns={{
            total_price: 'Total',
            tax: 'IVA',
            no: 'No. Cotización',
            extras: 'Traslado técnico',
            created_at: 'Fecha de creación',
            quote_requests: 'Cotizaciones solicitadas',
          }}
        />
      }
    </div>
  )
}
