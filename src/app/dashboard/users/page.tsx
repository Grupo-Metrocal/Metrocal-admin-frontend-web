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
import { setRoles } from '@/redux/features/user/rolesSlice'

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
  label: string
  priority: number
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
  const users = useAppSelector((state) => state.users.users)
  const roles = useAppSelector((state) => state.roles.roles)
  const dispatch = useAppDispatch()

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
