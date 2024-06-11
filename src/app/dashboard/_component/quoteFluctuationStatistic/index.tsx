'use client'

import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { Content } from '@/components/Content'
import './index.scss'
import { useEffect, useState } from 'react'
import { BarChart } from '@/components/Charts/BarChart'

const getFluctuationStatistics = async () => {
  try {
    const response = await fetchData({
      url: 'quotes/get-fluctuation-statistic',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
    if (response.success) {
      return response.data
    } else {
      console.error('Error fetching data:', response.message)
      return []
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}

interface IStatistics {
  month: string
  count: number
  totalRevenue: number
}

export function QuoteFluctuationStatistic() {
  const [statistics, setStatistics] = useState<IStatistics[]>([])

  useEffect(() => {
    getFluctuationStatistics()
      .then((data) => {
        setStatistics(data)
      })
      .catch((error) => {
        console.error('Error setting statistics:', error)
        setStatistics([])
      })
  }, [])

  return (
    <Content title="Fluctuación de cotizaciones" colorTitle="purple">
      <div className="quote-fluctuation-statistic">
        {statistics.length > 0 ? (
          <div className="h-96 w-full">
            <BarChart
              data={statistics.map((item) => item.totalRevenue) as number[]}
              labels={statistics.map((item) => item.month)}
              title="Ingresos totales"
              backgroundColors={[
                'rgba(255, 99, 132)',
                'rgba(255, 159, 64)',
                'rgba(255, 205, 86)',
                'rgba(75, 192, 192)',
              ]}
            />
          </div>
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </div>
    </Content>
  )
}
