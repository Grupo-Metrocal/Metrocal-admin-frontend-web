'use client'
import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import type { IActivity } from '@/types/activities'
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
import { QuoteRequestItem } from '@/components/QuoteRequestItem'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

  const handleNavigation = (id: number) =>
    router.push(`/dashboard/quotes/view/${id}`)

  const handleGenerateActivity = async (id: number) => {
    toast.loading('Generando actividad...')

    const response = await fetchData({
      url: `activities/generate/${id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Actividad generada correctamente')
      setActivities((prev) => [...prev, response.data])
      setQuotes((prev) => prev.filter((quote) => quote.id !== id))
    } else {
      toast.error(response.details)
    }
  }

  const handleDeleteActivity = async (id: number) => {
    toast.loading('Eliminando actividad...')
    const response = await fetchData({
      url: `activities/delete/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Actividad eliminada correctamente')
      setActivities((prev) => prev.filter((activity) => activity.id !== id))
    } else {
      toast.error(response.details)
    }
  }

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
        <h2 className="mb-4 text-[#333]">
          Cotizaciones aprobadas recientemente:{' '}
          {quotes && quotes.length > 0 ? quotes.length : 0}
        </h2>

        <div className="activities-quotes-carousel">
          <CarouselComp className="carousel">
            {quotes && quotes.length > 0 ? (
              quotes.map((quote: IQuote) => (
                <CarouselItemComp key={quote.id} className="carousel-item">
                  <QuoteRequestItem
                    quote={quote as any}
                    name_button="Generar actividad"
                    onClick={() => handleGenerateActivity(quote.id)}
                    onClickContent={() => handleNavigation(quote.id)}
                  />
                </CarouselItemComp>
              ))
            ) : (
              <CarouselItemComp className="carousel-item h-[180px] bg-white rounded-md my-4 flex justify-center items-center">
                <div className="flex justify-center items-center">
                  No hay cotizaciones aprobadas recientemente
                </div>
              </CarouselItemComp>
            )}
          </CarouselComp>
        </div>

        <div className="activities-page">
          <header className="activities-header">
            <h2 className="mt-4  text-[#333]">
              Actividades disponibles: {activities.length}
            </h2>
          </header>
          <div className="activities_content">
            {loading ? (
              <div className="flex justify-center items-center">
                {' '}
                <Spinner />
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity: IActivity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  onDelete={handleDeleteActivity}
                />
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
