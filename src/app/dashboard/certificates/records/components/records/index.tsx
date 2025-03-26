import { DataTableDemo } from '@/components/Table'
import { ColumnsCertifiedRecords } from '../columnsRecords.tsx'
import { emmitCertificationsToClient } from '@/utils/functions'
import { toast } from 'sonner'
import { useState } from 'react'
import { Backdrop } from '@/components/Backdrop/index'

interface IProps {
  records: any[]
  currentPage: number
  pagination: {
    current_page: number
    total_pages: number
    total_data: number
  }
  setCurrentPage: any
  loading: boolean
  searchValue: string
  handleInputChange: (target: any) => void
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
  setCurrentPage,
  loading,
  searchValue,
  handleInputChange,
}: IProps) => {
  const [loadingEmmitCertificate, setLoadingEmmitCertificate] = useState(false)

  const forwaredCertification = async (id: number) => {
    setLoadingEmmitCertificate(true)

    const response = await emmitCertificationsToClient(id)
    toast.dismiss()
    setLoadingEmmitCertificate(false)

    if (response.success) {
      toast.success('Se han enviado todos los certificados')
    } else {
      toast.error('Hubo un error al enviar los certificados')
    }
  }

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
        <DataTableDemo<ICertifiedRecordsTable>
          columns={ColumnsCertifiedRecords({ forwaredCertification })}
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

      {
        loadingEmmitCertificate && <Backdrop title='Enviando todos los CERTIFICADOS, porfavor espere un momento.' message='Esto puede tardar unos minutos, dependiendo de la cantidad de certificados aprobados.' />
      }
    </div>
  )
}
