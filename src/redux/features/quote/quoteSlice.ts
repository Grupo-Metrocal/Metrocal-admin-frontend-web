import { createSlice } from '@reduxjs/toolkit'
import type {
  IClient,
  IEquipmentQuoteRequest,
} from '@/app/dashboard/quotes/requests/[id]/page'
import { parse } from 'path'

const initialState = {
  equipment: [] as IEquipmentQuoteRequest[],
  client: {} as IClient,
  selectedEquipment: {} as IEquipmentQuoteRequest,
  total: 0,
}

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setEquipment: (state, action) => {
      state.equipment = action.payload
    },
    setClient: (state, action) => {
      state.client = action.payload
    },
    setSelectedEquipment: (state, action) => {
      state.selectedEquipment = action.payload
    },
    setTotal: (state, action) => {
      state.total = action.payload
    },
    changePriceSelectedEquipment: (state, action) => {
      const { price } = action.payload
      state.selectedEquipment.price = Number(price)
    },
    changePrice: (state, action) => {
      const { id, price } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            price: Number(price),
          }
        }
        return item
      })
      state.equipment = equipment
    },
    changeDiscount: (state, action) => {
      const { id, discount } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            discount: Number(discount),
          }
        }
        return item
      })
      state.equipment = equipment
    },

    changeDiscountSelectedEquipment: (state, action) => {
      const { discount } = action.payload
      state.selectedEquipment.discount = Number(discount)
    },
  },
})

export const {
  setEquipment,
  setClient,
  setSelectedEquipment,
  setTotal,
  changePrice,
  changePriceSelectedEquipment,
  changeDiscount,
  changeDiscountSelectedEquipment,
} = quoteSlice.actions

export default quoteSlice.reducer

export const handlePrice = (id: number, target: any) => (dispatch: any) => {
  dispatch(changePrice({ id, price: target.value }))
  dispatch(changePriceSelectedEquipment({ price: target.value }))
  dispatch(calculateTotal())
}

export const handleDiscount = (id: number, target: any) => (dispatch: any) => {
  dispatch(changeDiscount({ id, discount: target.value }))
  dispatch(changeDiscountSelectedEquipment({ discount: target.value }))
  dispatch(calculateTotal())
}

export const calculateTotal = () => (dispatch: any, getState: any) => {
  const { selectedEquipment } = getState().quote
  const { price, count, discount } = selectedEquipment || {
    price: 0,
    count: 0,
    discount: 0,
  }
  const total = price * count - (price * count * discount) / 100
  dispatch(setTotal(total))
}
