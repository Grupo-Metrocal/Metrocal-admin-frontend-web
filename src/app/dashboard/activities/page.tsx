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
export default function Page() {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getData().then((response) => {
      if (response.success) {
        setActivities(response.data)
      } else {
        setActivities([])
      }
      setLoading(false)
    })
  }, [])

  return (
    <LayoutPage title="Actividades">
      <Content title="Asignación de actividades">
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
