'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { Spinner } from '@/components/Spinner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CertifiedRecords } from './components/records'
import { StatisticsActivity } from './components/statistics'
import { useForm } from '@/hooks/useForm'

const getRecords = async (page: number, no?: string) => {

  return await fetchData({
    url: `activities/certified-activities/${page}/10/${no}`,
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
  const { values, handleInputChange } = useForm({
    search: '',
  })
  const [pagination, setPagination] = useState<any>({
    current_page: 0,
    total_pages: 0,
    total_data: 0,
  })

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
    <LayoutPage title="Registros de certificaciones emitidas" rollBack>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <StatisticsActivity />
          <div>
            {
              <CertifiedRecords
                records={records}
                searchValue={values.search}
                handleInputChange={handleInputChange}
                currentPage={currentPage}
                pagination={pagination}
                setPagination={setPagination}
                loading={loading}
              />
            }
          </div>
        </>
      )}
    </LayoutPage>
  )
}
