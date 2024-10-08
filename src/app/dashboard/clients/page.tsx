'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { Spinner } from '@/components/Spinner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ClientRecords } from './components/records'
import { Modal } from '@/components/Modal'
import ClientRegister from '@/app/clientRegister'
import { CButton } from '@/components/CButton'
import { useForm } from '@/hooks/useForm'
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
export default function RecordsPage() {
  const [records, setRecords] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pagination, setPagination] = useState<any>({
    current_page: 0,
    total_pages: 0,
    total_data: 0,
  })

  const { values, handleInputChange } = useForm({
    search: '',
  })

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
          toast.dismiss()
          setLoading(false)
        })
    }, 700)

    return () => clearTimeout(timeOut)
  }, [values, currentPage])

  useEffect(() => {
    toast.loading('Cargando registros...')

    getRecords(currentPage)
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
  }, [currentPage])

  return (
    <LayoutPage title="Registros de clientes" rollBack>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white">
          <div className="p-4">
            <Modal
              title="Complete el formulario para registrar un nuevo cliente"
              Component={ClientRegister}
              size="xl"
            >
              <CButton>Crear nuevo cliente</CButton>
            </Modal>
          </div>

          {
            <ClientRecords
              records={records}
              currentPage={currentPage}
              searchValue={values.search}
              handleSearchChange={handleInputChange}
              pagination={pagination}
              setCurrentPage={setCurrentPage}
              loading={loading}
              handleDeleteClient={handleDeleteClient}
            />
          }
        </div>
      )}
    </LayoutPage>
  )
}
