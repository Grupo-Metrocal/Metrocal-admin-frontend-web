import { createSlice } from '@reduxjs/toolkit'
import { IQuoteRequestRegistered } from '@/app/dashboard/quotes/records/component/RegisterList'
const initialState = {
  data: [] as IQuoteRequestRegistered[],
}

export const quoteRequestSlice = createSlice({
  name: 'quoteRequest',
  initialState,
  reducers: {
    setQuoteRequest: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setQuoteRequest } = quoteRequestSlice.actions

export default quoteRequestSlice.reducer

export const deleteItemQuoteRequestRegisters =
  (id: number) => (dispatch: any, getState: any) => {
    console.log('id', id)
    const { quoteRequest } = getState()
    const { data } = quoteRequest
    const newData = data.filter(
      (item: IQuoteRequestRegistered) => item.id !== id,
    )
    dispatch(setQuoteRequest(newData))
  }
