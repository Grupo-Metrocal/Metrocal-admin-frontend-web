'use client'
import { BarChart } from '@/components/Charts/BarChart'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { BarChart2 } from 'lucide-react'

const getData = async (lastMonths: number) => {
  return await fetchData({
    url: `quotes/request/monthly/graphic/${lastMonths}`,
    headers: { Authorization: `Bearer ${getCookie('token')}` },
  })
}

export const RecentQuotes = () => {
  const [months, setMonths] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])
  const total = data.reduce((a, b) => a + b, 0)

  useEffect(() => {
    getData(4).then((response) => {
      setMonths(
        response.data.map((item: any) => {
          const date = new Date(item.month)
          return date.toLocaleString('es-ES', { month: 'short' })
        }),
      )
      setData(response.data.map((item: any) => item.count))
    })
  }, [])

  return (
    <div className="recent-chart">
      <div className="recent-chart__header">
        <div className="recent-chart__header-icon">
          <BarChart2 size={15} />
        </div>
        <div>
          <h3 className="recent-chart__title">Últimos 4 meses</h3>
          <p className="recent-chart__sub">Cotizaciones por mes</p>
        </div>
        {total > 0 && (
          <span className="recent-chart__total">{total} total</span>
        )}
      </div>
      <div className="recent-chart__body">
        <BarChart
          title="Cotizaciones"
          data={data}
          labels={months}
          backgroundColors={[
            'rgba(37, 99, 235, 0.85)',
            'rgba(124, 58, 237, 0.85)',
            'rgba(16, 185, 129, 0.85)',
            'rgba(245, 158, 11, 0.85)',
          ]}
        />
      </div>
    </div>
  )
}
