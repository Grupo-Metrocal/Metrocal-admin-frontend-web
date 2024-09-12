'use client'
import { Content } from '@/components/Content'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Gauge, SeparatorLine } from '@/components/Gauge'
import { Spinner } from '@/components/Spinner'
import { formatPrice } from '@/utils/formatPrice'

export interface Root {
  all_quotes: AllQuotes
  rejected_quotes: RejectedQuotes
  approved_quotes: ApprovedQuotes
}

export interface AllQuotes {
  current_invoice: number
  last_invoice: number
  current_number_quotes_generated: number
}

export interface RejectedQuotes {
  number_quotes_rejected_by_client: number
  number_quotes_rejected_by_staff: number
  invoice_rejected_by_staff: number
  invoice_rejected_by_client: number
}

export interface ApprovedQuotes {
  percentageChange: number
  approved_quote_invoice: number
  last_approved_quote_invoice: number
  approved_number_quotes: number
}

const fetchQuotationsDetails = async () => {
  return await fetchData({
    url: 'quotes/fetch-quotation-details',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export const QuotationsDetails = () => {
  const [statistics, setStatistics] = useState<Root>({} as Root)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchQuotationsDetails()
      .then((data) => {
        if (data.success) {
          setStatistics(data.data)
        } else {
          setStatistics({} as Root)
          toast.error('No se pudieron cargar las estadísticas')
        }
      })
      .catch(() => {
        setStatistics({} as Root)
        toast.error('No se pudieron cargar las estadísticas')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className='rounded'>
      {
        isLoading ? (<div className='w-full flex items-center justify-center'>
          <Spinner />
        </div>)
          : (
            <div className='flex flex-col gap-4'>
              <div className="bg-white shadow-sm rounded-lg">
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col p-4">
                    <span className='text-gray-400 font-semibold text-xs tracking-wider'>VISTA GENERAL</span>
                    <small className="text-gray-400">Información del mes actual</small>
                  </div>
                </div>
                <div className='flex justify-between relative'>
                  <Gauge
                    value={formatPrice(statistics.all_quotes.current_invoice)}
                    label='Facturacion Total de Cotizaciones'
                    increase={
                      Number(
                        (
                          ((statistics.all_quotes.current_invoice - statistics.all_quotes.last_invoice) /
                            statistics.all_quotes.last_invoice) *
                          100
                        ).toFixed(2),
                      )
                    }
                  />
                  <SeparatorLine />
                  <Gauge
                    value={formatPrice(statistics.rejected_quotes.invoice_rejected_by_client)}
                    label='Cotizaciones Rechazadas por Clientes'
                    increase={0}
                  />
                  <SeparatorLine />
                  <Gauge
                    value={formatPrice(statistics.rejected_quotes.invoice_rejected_by_staff)}
                    label='Cotizaciones Rechazadas por Metrocal'
                    increase={0}
                  />
                </div>
              </div>
              <div className="bg-white shadow-sm rounded-lg w-full p-4 ">
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col px-4">
                    <span className='text-gray-400 font-semibold text-xs tracking-wider'>COTIZACIONES APROBADAS</span>
                  </div>
                </div>
                <div className='flex justify-between relative'>
                  <Gauge
                    value={formatPrice(statistics.approved_quotes.approved_number_quotes, 0)}
                    label='Cotizaciones Aprobadas'
                    increase={0}
                  />
                  <SeparatorLine />
                  <Gauge
                    value={formatPrice(statistics.approved_quotes.last_approved_quote_invoice)}
                    label='Facturación del Mes pasado'
                    increase={0}
                  />
                  <SeparatorLine />

                  <Gauge
                    value={formatPrice(statistics.approved_quotes.approved_quote_invoice)}
                    label='Total Facturado del Mes'
                    increase={statistics.approved_quotes.percentageChange}
                  />

                </div>
              </div>
            </div>
          )
      }

    </div>
  )
}
