import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from './features/quote/quoteSlice'
import rowSelectionReducer from './features/data_table/rowSelection'
import quoteRequestReducer from './features/quote/quoteRequestSlice'
import usersReducer from './features/user/usersSlice'
import rolesReducer from './features/user/rolesSlice'
import profileReducer from './features/profile'

export const store = configureStore({
  reducer: {
    quote: quoteReducer,
    rowSelection: rowSelectionReducer,
    quoteRequest: quoteRequestReducer,
    users: usersReducer,
    roles: rolesReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
