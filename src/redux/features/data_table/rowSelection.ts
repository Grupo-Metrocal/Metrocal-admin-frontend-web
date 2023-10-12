import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rowSelection: {},
}

const rowSelection = createSlice({
  name: 'rowSelection',
  initialState,
  reducers: {
    setRowSelectionTable: (state, action) => {
      state.rowSelection = action.payload
    },
  },
})

export const { setRowSelectionTable } = rowSelection.actions

export default rowSelection.reducer
