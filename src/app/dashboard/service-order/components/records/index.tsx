import { DataTableDemo } from '@/components/Table'
import { ColumnsServicesOrders } from '../columnsRecords.tsx'

interface IProps {
  records: any[]
  currentPage: number
  pagination: {
    current_page: number
    total_pages: number
    total_data: number
  }
  setPagination: any
  loading: boolean
  searchValue: string
  handleInputChange: (target: any) => void
  setCurrentPage: any
}

export type IServicesOrderRecords = {
  id: number
  quote_request_id: number
  no: string
  client_name: string
  end_date: string
  services_order_quantity: number
  resposable: string
}

export const ServicesOrderRecords = ({
  records,
  currentPage,
  pagination,
  loading,
  searchValue,
  handleInputChange,
  setCurrentPage
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
        <DataTableDemo<IServicesOrderRecords>
          columns={ColumnsServicesOrders({ onDelete: () => { } })}
          searchValue={searchValue}
          handleSearch={handleInputChange}
          data={records ?? []}
          search_by="no"
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={pagination.total_pages}
          isLoading={loading}
          search_placeholder="Buscar No. cotización"
          filter_columns={{
            no: 'No. Cotización',
            client_name: 'Empresa',
            end_date: 'Fecha de finalización',
            services_order_quantity: 'Ordenes de Servicios',
            resposable: 'Reponsable de actividad',
          }}
        />
      }
    </div>
  )
}
