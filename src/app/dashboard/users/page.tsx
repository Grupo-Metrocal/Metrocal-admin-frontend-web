'use client'
import './page.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { SearchUsers } from './components/search'
import { fetchData } from '@/utils/fetch'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { ListUsers } from './components/listUsers'
import { Roles } from './components/roles'
import { deleteUser } from '@/utils/functions'

export type IUser = {
  id: number
  username: string
  email: string
  image?: string
  roles?: any
}
const getUsers = async (token: string) => {
  return await fetchData({
    url: 'users',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export interface IRole {
  id: number
  name: string
  description: string
  createdAt: string
  users: IUser[]
}

const getRoles = async (token: string) => {
  return await fetchData({
    url: 'roles',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default function Page() {
  const [users, setUsers] = useState<IUser[]>([])
  const [roles, setRoles] = useState<IRole[]>([])
  const [error, setError] = useState<string>('')

  const handleDeleteUser = async (id: number) => {
    const token = getCookie('token')
    const response = await deleteUser(id, token as string)

    if (response) {
      const newUsers = users.filter((user) => user.id !== id)
      setUsers(newUsers)
    }
  }

  useEffect(() => {
    const token = getCookie('token')
    getUsers(token as string).then((res) => {
      if (res.status === 200) {
        setUsers(res.data)
      } else {
        toast.error('Error al obtener los usuarios', {
          description: res.message as string,
        })
      }
    })

    getRoles(token as string).then((res) => {
      if (res.status === 200) {
        setRoles(res.data)
      } else {
        toast.error('Error al obtener los roles', {
          description: res.message as string,
        })
      }
    })
  }, [])

  return (
    <LayoutPage title="Usuarios">
      <div className="users-sections">
        <section className="search_users-container">
          <SearchUsers users={users} />
          <Roles roles={roles} />
        </section>

        <ListUsers users={users} onDelete={handleDeleteUser} />
      </div>
    </LayoutPage>
  )
}
