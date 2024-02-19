'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import type { IActivity, ITeammember } from '@/types/activities'
import { useState, useEffect } from 'react'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { Spinner } from '@/components/Spinner'
import { Content } from '@/components/Content'
import { ActivityItem } from './components/ActivityItem'
import { toast } from 'sonner'
import { IQuote } from './interface/quote'
import { CarouselComp } from '@/components/Carousel'
import { CarouselItemComp } from '@/components/Carousel/CarouselItem'

const getData = async () => {
  const response = await fetchData({
    url: 'activities',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response
}

const getQuotes = async (status: string) => {
  const response = await fetchData({
    url: `quotes/get-by-status/${status}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response
}
export default function Page() {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [quotes, setQuotes] = useState<IQuote[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getData().then((response) => {
      if (response.success) {
        setActivities(response.data)
      } else {
        setActivities([])
        toast.error(response.message || response.details)
      }
      setLoading(false)
    })

    getQuotes('done').then((response) => {
      if (response.success) {
        setQuotes(response.data)
      } else {
        setQuotes([] as any)
        toast.error(response.message || response.details)
      }
      setLoading(false)
    })
  }, [])

  return (
    <LayoutPage title="Actividades">
      <Content title="Asignación de actividades">
        <div className="activities-quotes-carousel">
          <CarouselComp>
            <CarouselItemComp>
              {quotes && quotes.length > 0 ? (
                quotes.map((quote: IQuote) => (
                  <div key={quote.id} className="quote-item">
                    <h3>Cotización: {quote.no}</h3>
                    <p>Cliente: {quote.client.company_name}</p>
                    <p>
                      Fecha: {new Date(quote.created_at).toLocaleDateString()}
                    </p>
                    <p>Precio: {quote.price}</p>
                  </div>
                ))
              ) : (
                <div className="quote-item">
                  <p>No hay cotizaciones</p>
                </div>
              )}
            </CarouselItemComp>
          </CarouselComp>
        </div>

        <div className="activities-page">
          <header className="activities-header">
            <h2>Actividades disponibles: {activities.length}</h2>
          </header>
          <div className="activities_content">
            {loading ? (
              <div className="flex justify-center items-center">
                {' '}
                <Spinner />
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity: IActivity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="flex justify-center items-center">
                {' '}
                No hay actividades
              </div>
            )}
          </div>
        </div>
      </Content>
    </LayoutPage>
  )
}
