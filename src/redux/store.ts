import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from './features/quote/quoteSlice'
import rowSelectionReducer from './features/data_table/rowSelection'

export const store = configureStore({
  reducer: {
    quote: quoteReducer,
    rowSelection: rowSelectionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
