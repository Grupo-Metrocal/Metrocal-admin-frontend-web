import { createSlice } from '@reduxjs/toolkit'

interface IProfile {
  username: string
  imageURL?: any
  id: number
  role: IRole
}
interface IRole {
  name: string
  priority: number
  id: number
  label: string
}

const initialState = {
  profile: {} as IProfile,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  },
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer
