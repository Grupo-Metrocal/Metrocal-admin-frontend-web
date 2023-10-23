import { createSlice } from '@reduxjs/toolkit'
import type { IUser } from '@/app/dashboard/users/page'

const initialState = {
  users: [] as IUser[],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    addUser: (state, action) => {
      const { user } = action.payload
      state.users.push(user)
    },
    addRole: (state, action) => {
      const { user, role } = action.payload
      const index = state.users.findIndex((u) => u.id === user.id)
      state.users[index].roles.push(role)
    },
    removeRole: (state, action) => {
      const { user, role } = action.payload
      const index = state.users.findIndex((u) => u.id === user.id)
      const roleIndex = state.users[index].roles.findIndex(
        (r: any) => r.id === role.id,
      )
      state.users[index].roles.splice(roleIndex, 1)
    },
  },
})

export const { setUsers, addUser, addRole, removeRole } = usersSlice.actions

export default usersSlice.reducer
