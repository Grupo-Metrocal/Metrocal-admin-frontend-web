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
  handleDeleteClient: (id: number) => void
  loading: boolean
}

export type IClientsRecordsTable = {
  id: number
  company_name: string
  email: string
  requested_by: string
  phone: string
  address: string
  quote_requests: number[]
}

export const ClientRecords = ({
  records,
  currentPage,
  pagination,
  setCurrentPage,
  loading,
  handleDeleteClient,
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
        <DataTableDemo<IClientsRecordsTable>
          columns={ColumnsCertifiedRecords({ onDelete: handleDeleteClient })}
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
            company_name: 'Empresa',
            email: 'Correo del cliente',
            requested_by: 'Solicitante',
            phone: 'Teléfono',
            address: 'Dirección',
            quote_requests: 'Cotizaciones solicitadas',
          }}
        />
      }
    </div>
  )
}