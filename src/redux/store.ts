import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from './features/quote/quoteSlice'

export const store = configureStore({
  reducer: {
    quote: quoteReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
