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
  },
})

export const { setUsers, addUser } = usersSlice.actions

export default usersSlice.reducer
