'use client'
import { Content } from '@/components/Content'
import { BarChart } from '@/components/Charts/BarChart'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

const getData = async (lastMonths: number) => {
  return await fetchData({
    url: `quotes/request/monthly/graphic/${lastMonths}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export const RecentQuotes = () => {
  const [month, setMonth] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    getData(4).then((response) => {
      setMonth(
        response.data.map((item: any) => {
          const date = new Date(item.month)
          return date.toLocaleString('es-ES', { month: 'long' })
        }),
      )

      setData(response.data.map((item: any) => item.count))
    })
  }, [])

  return (
    <Content title="Ultimos meses" colorTitle="green" className="recent-quotes">
      <BarChart
        title="Cotizaciones"
        data={data}
        labels={month}
        backgroundColors={[
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(75, 192, 192)',
        ]}
      />
    </Content>
  )
}
