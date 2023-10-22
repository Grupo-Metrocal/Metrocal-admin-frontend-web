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
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setUsers } from '@/redux/features/user/usersSlice'
import { deleteUserFromRole, setRoles } from '@/redux/features/user/rolesSlice'

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
  const [error, setError] = useState<string>('')
  const users = useAppSelector((state) => state.users.users)
  const roles = useAppSelector((state) => state.roles.roles)
  const dispatch = useAppDispatch()

  const handleAssignRole = async (id: number) => {
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
        dispatch(setUsers(res.data))
      } else {
        toast.error('Error al obtener los usuarios', {
          description: res.message as string,
        })
      }
    })

    getRoles(token as string).then((res) => {
      if (res.status === 200) {
        dispatch(setRoles(res.data))
      } else {
        toast.error('Error al obtener los roles', {
          description: res.message as string,
        })
      }
    })
  }, [dispatch])

  return (
    <LayoutPage title="Usuarios">
      <div className="users-sections">
        <section className="search_users-container">
          <SearchUsers users={users} />
          <Roles roles={roles} />
        </section>

        <ListUsers />
      </div>
    </LayoutPage>
  )
}
