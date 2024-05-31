'use client'

import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { AreaChart } from '@tremor/react'
import { Content } from '@/components/Content'
import './index.scss'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/utils/formatPrice'

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
          <AreaChart
            data={statistics}
            index="month"
            categories={['totalRevenue']}
            colors={['indigo', 'rose', 'green', 'blue', 'yellow']}
            valueFormatter={formatPrice}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </div>
    </Content>
  )
}
