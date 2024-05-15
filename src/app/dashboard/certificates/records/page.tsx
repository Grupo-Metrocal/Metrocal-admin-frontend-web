'use client'
import { LayoutPage } from '@/components/LayoutPage'
import { Spinner } from '@/components/Spinner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CertifiedRecords } from './components/records'
const getRecords = async (page: number) => {
  return await fetchData({
    url: `activities/certified-activities/${page}/10`,
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
        <div>
          {
            <CertifiedRecords
              records={records}
              currentPage={currentPage}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
            />
          }
        </div>
      )}
    </LayoutPage>
  )
}
