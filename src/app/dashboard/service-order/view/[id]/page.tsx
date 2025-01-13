'use client'
import { Activity } from "@/app/dashboard/activities/interface/quote"
import { Content } from "@/components/Content"
import { LayoutPage } from "@/components/LayoutPage"
import { handleGeneratePDFServiceOrder } from "@/utils/downloadPDFQuote"
import { fetchData } from "@/utils/fetch"
import { formatDate } from "@/utils/formatDate"
import { getCookie } from "cookies-next"
import { Download } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const getData = async (id: string) => {
  const response = await fetchData({
    url: `activities/service-order/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response
}

export interface IRoot {
  params: {
    id: string
  }
}

export default function Page({ params }: IRoot) {
  const { id } = params
  const [data, setData] = useState<Activity>()

  useEffect(() => {
    const dataActivity = async () => {
      const response = await getData(id)

      if (response.success) {
        setData(response.data)
      } else {
        toast.error('No se pudo cargar la información', {
          description: response.message || response.details
        })
      }
    }

    dataActivity()
  }, [])

  return (
    <LayoutPage title="Ordenes de servicio" rollBack>
      <Content title="Ordenes de servicios emitidas">
        <div className="grid grid-cols-5 gap-4">
          {
            data && (
              data.service_order?.map((serviceOrder, index) => {
                return (
                  <div key={serviceOrder.id} className="flex gap-2 bg-gray-50 p-2 justify-between rounded shadow">
                    <div className="flex gap-4 flex-col">
                      <span>
                        Orden de servicio #{index + 1}
                      </span>
                      <small className="text-gray-400">{formatDate(serviceOrder.created_at)}</small>
                    </div>
                    <div className="flex items-center justify-center p-2">
                      <Download className="cursor-pointer hover:bg-gray-200"
                        onClick={() => handleGeneratePDFServiceOrder({ activityId: id as unknown as number, serviceOrderId: serviceOrder.id })}
                      />
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

      </Content>
    </LayoutPage>
  )
}