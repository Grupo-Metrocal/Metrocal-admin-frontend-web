import { createSlice } from '@reduxjs/toolkit'
import type { IRole } from '@/app/dashboard/users/page'

const initialState = {
  roles: [] as IRole[],
}

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    addUserToRole: (state, action) => {
      console.log({ action, state })
      const { user } = action.payload
      user.roles.forEach((role: any) => {
        const index = state.roles.findIndex((r) => r.id === role.id)
        if (index !== -1) {
          state.roles[index].users.push(user)
        }
      })
    },
    deleteUserFromRole: (state, action) => {
      const { user } = action.payload
      user.roles.forEach((role: any) => {
        const index = state.roles.findIndex((r) => r.id === role.id)
        if (index !== -1) {
          const userIndex = state.roles[index].users.findIndex(
            (u) => u.id === user.id,
          )
          if (userIndex !== -1) {
            state.roles[index].users.splice(userIndex, 1)
          }
        }
      })
    },
  },
})

export const { setRoles, addUserToRole, deleteUserFromRole } =
  rolesSlice.actions

export default rolesSlice.reducer
