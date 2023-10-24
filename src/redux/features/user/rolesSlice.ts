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
      const existingRoleIds = new Set(state.roles.map((r) => r.id))

      user.roles.forEach((role: any) => {
        if (existingRoleIds.has(role.id)) {
          const roleIndex = state.roles.findIndex((r) => r.id === role.id)
          const userIndex = state.roles[roleIndex].users.findIndex(
            (u) => u.id === user.id,
          )

          if (userIndex === -1) {
            state.roles[roleIndex].users.push(user)
          }
        }
      })
    },
    deleteUserFromRole: (state, action) => {
      const { user } = action.payload
      const existingRoleIds = new Set(state.roles.map((r) => r.id))

      user.roles.forEach((role: any) => {
        if (existingRoleIds.has(role.id)) {
          const roleIndex = state.roles.findIndex((r) => r.id === role.id)
          const userIndex = state.roles[roleIndex].users.findIndex(
            (u) => u.id === user.id,
          )

          if (userIndex !== -1) {
            state.roles[roleIndex].users.splice(userIndex, 1)
          }
        }
      })
    },
    renameLabel: (state, action) => {
      const { id, label } = action.payload
      const roleIndex = state.roles.findIndex((r) => r.id === id)
      state.roles[roleIndex].label = label
    },
  },
})

export const { setRoles, addUserToRole, deleteUserFromRole, renameLabel } =
  rolesSlice.actions

export default rolesSlice.reducer
