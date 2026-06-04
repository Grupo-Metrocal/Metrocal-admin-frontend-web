'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { Spinner } from '@/components/Spinner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ClientRecords } from './components/records'
import { Modal } from '@/components/Modal'
import ClientRegister from '@/app/clientRegister'
import { CButton } from '@/components/CButton'
import { useForm } from '@/hooks/useForm'
import { Button } from '@/components/ui/button'
import { FileDown, UserPlus, Users, FileText, Trash2, Mail, Tag, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { IClientsRecordsTable } from './components/records'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { setRowSelectionTable } from '@/redux/features/data_table/rowSelection'
import { BulkEmailModal } from './components/BulkEmailModal'

const getRecords = async (page: number, company_name?: string) => {
  return await fetchData({
    url: `clients/${page}/10/${company_name}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

const getAllClients = async () => {
  return await fetchData({
    url: 'clients',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

const exportToCSV = (clients: any[]) => {
  const headers = [
    'ID',
    'Empresa',
    'Correo',
    'Solicitante',
    'Teléfono',
    'Dirección',
    'No. RUC',
    'Teléfono empresa',
    'Fecha de creación',
  ]

  const rows = clients.map((c) => [
    c.id ?? '',
    c.company_name ?? '',
    c.email ?? '',
    c.requested_by ?? '',
    c.phone ?? '',
    c.address ?? '',
    c.no_ruc ?? '',
    c.company_phone ?? '',
    c.created_at ? new Date(c.created_at).toLocaleDateString('es-NI') : '',
  ])

  const escape = (value: any) => {
    const str = String(value)
    return str.includes(',') || str.includes('"') || str.includes('\n')
      ? `"${str.replace(/"/g, '""')}"`
      : str
  }

  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n')

  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `clientes_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
export default function RecordsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const selectedIds: number[] = useAppSelector(
    (state: any) => state.rowSelection.rowSelection ?? [],
  )

  const [records, setRecords] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pagination, setPagination] = useState<any>({
    current_page: 0,
    total_pages: 0,
    total_data: 0,
  })

  const [exportingCSV, setExportingCSV] = useState<boolean>(false)
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false)
  const [tableLoading, setTableLoading] = useState<boolean>(false)

  const { values, handleInputChange } = useForm({
    search: '',
  })

  const prevSearchRef = useRef(values.search)

  const selectedClients = records.filter((r: any) =>
    Array.isArray(selectedIds) && selectedIds.includes(r.id),
  )

  const clearSelection = () => dispatch(setRowSelectionTable([]))

  const handleRowClick = (client: IClientsRecordsTable) => {
    router.push(`/dashboard/clients/view/${client.id}`)
  }

  const handleBulkDelete = async () => {
    if (!window.confirm(`¿Eliminar ${selectedIds.length} cliente(s) seleccionados?`)) return

    toast.loading(`Eliminando ${selectedIds.length} clientes...`)
    await Promise.all(
      selectedIds.map((id) =>
        fetchData({
          url: `clients/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        }),
      ),
    )
    toast.dismiss()
    toast.success(`${selectedIds.length} clientes eliminados correctamente`)
    setRecords((prev: any) => prev.filter((r: any) => !selectedIds.includes(r.id)))
    clearSelection()
  }

  const handleBulkExportCSV = () => {
    exportToCSV(selectedClients)
    toast.success(`${selectedClients.length} clientes exportados`)
    clearSelection()
  }

  const handleBulkEmail = () => {
    setEmailModalOpen(true)
  }

  const handleBulkTag = () => {
    toast.info('Etiquetado masivo próximamente disponible')
  }

  const handleExportCSV = async () => {
    setExportingCSV(true)
    toast.loading('Exportando clientes...')

    try {
      const data = await getAllClients()
      toast.dismiss()

      const clients = Array.isArray(data) ? data : (data?.data ?? [])
      if (clients.length > 0) {
        exportToCSV(clients)
        toast.success(`${clients.length} clientes exportados correctamente`)
      } else {
        toast.error('No se pudieron obtener los clientes para exportar')
      }
    } catch {
      toast.dismiss()
      toast.error('Error al exportar los clientes')
    } finally {
      setExportingCSV(false)
    }
  }

  const handleDeleteClient = async (id: number) => {
    toast.loading('Eliminando cliente...')

    const response = await fetchData({
      url: `clients/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Cliente eliminado correctamente')
      setRecords((prev: any) => prev.filter((record: any) => record.id !== id))
    } else {
      toast.error('No se pudo eliminar el cliente')
    }
  }

  useEffect(() => {
    const searchChanged = values.search !== prevSearchRef.current
    prevSearchRef.current = values.search
    const delay = searchChanged ? 700 : 0

    setTableLoading(true)

    const timeOut = setTimeout(() => {
      getRecords(currentPage, values.search)
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
          setLoading(false)
          setTableLoading(false)
        })
    }, delay)

    return () => clearTimeout(timeOut)
  }, [values.search, currentPage])

  return (
    <LayoutPage
      title="Registros de clientes"
      subTitle={!loading ? `${pagination.total_data} clientes registrados` : ''}
      rollBack
    >
      {loading ? (
        <div className="w-full flex items-center justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 pt-4">
            <div className="flex items-center gap-3 bg-[#e6f7fc] border border-[#b3e8f8] rounded-xl p-4">
              <div className="bg-[#0199d4] rounded-full p-2 shrink-0">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total de clientes</p>
                <p className="text-2xl font-bold text-gray-800">{pagination.total_data}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#e6f7fc] border border-[#b3e8f8] rounded-xl p-4">
              <div className="bg-[#0178a8] rounded-full p-2 shrink-0">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Páginas de resultados</p>
                <p className="text-2xl font-bold text-gray-800">
                  {pagination.current_page} <span className="text-sm font-normal text-gray-400">de {pagination.total_pages}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-4 py-4 flex flex-wrap gap-2 items-center border-b border-gray-100">
            <Modal
              title="Complete el formulario para registrar un nuevo cliente"
              Component={ClientRegister}
              size="xl"
            >
              <CButton>
                <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Crear nuevo cliente
                </span>
              </CButton>
            </Modal>

            <Button
              variant="outline"
              onClick={handleExportCSV}
              disabled={exportingCSV}
              className="flex items-center gap-2"
            >
              <FileDown className="h-4 w-4" />
              {exportingCSV ? 'Exportando...' : 'Exportar CSV'}
            </Button>
          </div>

          <div className="p-4">
            <ClientRecords
              records={records}
              currentPage={currentPage}
              searchValue={values.search}
              handleSearchChange={handleInputChange}
              pagination={pagination}
              setCurrentPage={setCurrentPage}
              loading={tableLoading}
              handleDeleteClient={handleDeleteClient}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      )}

      <BulkEmailModal
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
        selectedClients={selectedClients}
        onSuccess={clearSelection}
      />

      {/* Bulk actions floating bar */}
      {Array.isArray(selectedIds) && selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white rounded-2xl px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-gray-100">
          {/* Count badge */}
          <div className="flex items-center gap-2 bg-[#0199d4] rounded-xl px-3.5 py-2 mr-1">
            <Users className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-bold text-white whitespace-nowrap">
              {selectedIds.length} seleccionado{selectedIds.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="w-px h-7 bg-gray-100 mx-1" />

          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Eliminar
          </button>

          <button
            onClick={handleBulkExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FileDown className="h-3.5 w-3.5" />
            Exportar
          </button>

          <button
            onClick={handleBulkEmail}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            Correo
          </button>

          <button
            onClick={handleBulkTag}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Tag className="h-3.5 w-3.5" />
            Etiquetar
          </button>

          <div className="w-px h-7 bg-gray-100 mx-1" />

          <button
            onClick={clearSelection}
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            title="Limpiar selección"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </LayoutPage>
  )
}
