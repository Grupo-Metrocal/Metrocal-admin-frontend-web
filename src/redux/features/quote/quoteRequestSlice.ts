import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  data: [] as any[],
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
    const { quoteRequest } = getState()
    const { data } = quoteRequest
    const newData = data.filter((item: any) => item.id !== id)
    dispatch(setQuoteRequest(newData))
  }
