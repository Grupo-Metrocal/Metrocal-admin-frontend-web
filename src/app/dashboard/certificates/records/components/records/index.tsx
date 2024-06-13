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
  setPagination: any
  loading: boolean
}

export type ICertifiedRecordsTable = {
  id: number
  issued_certificates: number
  emited_date: string
  calibrated_equipment: string
  client_company_name: string
  emited_by: string
  client_email: string
  pending_certificates: number
  quote_request_id: number
}

export const CertifiedRecords = ({
  records,
  currentPage,
  pagination,
  setPagination,
  loading,
}: IProps) => {
  const handlePreviousPage = () => {
    if (pagination.current_page > 1) {
      setPagination({
        ...pagination,
        current_page: pagination.current_page - 1,
      })
    }
  }

  const handleNextPage = () => {
    if (pagination.current_page < pagination.total_pages) {
      setPagination({
        ...pagination,
        current_page: pagination.current_page + 1,
      })
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      {
        <DataTableDemo<ICertifiedRecordsTable>
          columns={ColumnsCertifiedRecords({ onDelete: () => {} })}
          searchValue={''}
          data={records ?? []}
          search_by="client_company_name"
          setPagination={(event: { target: { value: any } }) => {
            setPagination({
              ...pagination,
              current_page: event.target.value,
            })
          }}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={pagination.total_pages}
          isLoading={loading}
          search_placeholder="Buscar nombre de client"
          filter_columns={{
            client_company_name: 'Empresa',
            client_email: 'Correo del cliente',
            emited_date: 'Fecha de emisión',
            calibrated_equipment: 'Equipo calibrado',
            pending_certificates: 'Certificados pendientes',
            issued_certificates: 'Certificados emitidos',
            emited_by: 'Emisor',
          }}
        />
      }
    </div>
  )
}
