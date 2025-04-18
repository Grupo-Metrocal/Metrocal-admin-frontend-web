import { createSlice } from '@reduxjs/toolkit'
import type {
  IClient,
  IEquipmentQuoteRequest,
  IQuote,
} from '@/app/dashboard/quotes/requests/[id]/page'

const initialState = {
  id: 0,
  equipment: [] as IEquipmentQuoteRequest[],
  client: {} as IClient,
  selectedEquipment: {} as IEquipmentQuoteRequest,
  IVA: 0,
  IVAValue: 0,
  discount: 0,
  discountvalue: 0,
  total: 0,
  subtotal: 0,
  extras: 0,
  status: '',
  no: '',
}

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setID: (state, action) => {
      state.id = action.payload
    },
    setIVAValue: (state, action) => {
      state.IVAValue = action.payload
    },
    setDiscountValue: (state, action) => {
      state.discountvalue = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setTypeService: (state, action) => {
      const { id, type_service } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            type_service,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.type_service = type_service
    },
    setName: (state, action) => {
      const { id, name } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.name = name
    },
    setCountEquipment: (state, action) => {
      const { id, count } = action.payload

      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.count = count
    },
    setAdditionalRemarks: (state, action) => {
      const { id, additional_remarks } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            additional_remarks,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.additional_remarks = additional_remarks
    },
    setIsCreditable: (state, action) => {
      const { id, is_creditable } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            is_creditable,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.is_creditable = is_creditable
    },
    setComment: (state, action) => {
      const { id, comment } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            comment,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.comment = comment
    },
    setMeasuringRange: (state, action) => {
      const { id, measuring_range } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            measuring_range,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.measuring_range = measuring_range
    },
    setCalibrationRethod: (state, action) => {
      const { id, calibration_method } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            calibration_method,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.calibration_method = calibration_method
    },
    setAlternativeCertificateMethod: (state, action) => {
      const { id, use_alternative_certificate_method } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            use_alternative_certificate_method,
          }
        }
        return item
      })

      state.equipment = equipment
      state.selectedEquipment.use_alternative_certificate_method =
        use_alternative_certificate_method
    },
    setDiscount: (state, action) => {
      state.discount = action.payload
    },
    setTotalPrice: (state, action) => {
      state.total = action.payload
    },
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
      state.selectedEquipment.total = action.payload
    },
    changeTotalEquipment: (state, action) => {
      const { id, total } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            total,
          }
        }
        return item
      })
      state.equipment = equipment
    },
    changeStatusSelectedEquipment: (state, action) => {
      const { status } = action.payload
      state.selectedEquipment.status = status
    },
    changeStatus: (state, action) => {
      const { id, status } = action.payload
      const equipment = state.equipment.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
          }
        }
        return item
      })
      state.equipment = equipment
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
    changeExtras: (state, action) => {
      state.extras = action.payload
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
    changeDiscountvalueSelectedEquipment: (state, action) => {
      const { discountvalue } = action.payload
      state.selectedEquipment.discountvalue = Number(discountvalue)
    },
    setIVA: (state, action) => {
      state.IVA = action.payload
    },
    setTotalQuote: (state, action) => {
      state.total = action.payload
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload
    },
    setDiscountQuote: (state, action) => {
      state.discount = action.payload
    },
    setNo: (state, action) => {
      state.no = action.payload
    },
    setNewEquipment: (state, action) => {
      state.equipment.push(action.payload)
    },
    deleteEquipmentFromQuote: (state, action) => {
      const { id } = action.payload

      state.equipment = state.equipment.filter(
        (equipment) => equipment.id !== id,
      )
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
  changeDiscountvalueSelectedEquipment,
  changeStatus,
  changeStatusSelectedEquipment,
  setIVA,
  setTotalQuote,
  setSubtotal,
  setDiscountQuote,
  changeTotalEquipment,
  setID,
  setTotalPrice,
  setDiscount,
  setStatus,
  setComment,
  setNo,
  setMeasuringRange,
  setCalibrationRethod,
  setAlternativeCertificateMethod,
  changeExtras,
  setIVAValue,
  setDiscountValue,
  setAdditionalRemarks,
  setTypeService,
  setName,
  setCountEquipment,
  setNewEquipment,
  deleteEquipmentFromQuote,
  setIsCreditable,
} = quoteSlice.actions

export default quoteSlice.reducer

export const handleStatus = (id: number, status: string) => (dispatch: any) => {
  dispatch(changeStatus({ id, status }))
  dispatch(changeStatusSelectedEquipment({ status }))
}

export const handleChangeExtras = (extras: number) => (dispatch: any) => {
  dispatch(changeExtras(extras))
  dispatch(calculateSubtotal())
  dispatch(calculateTotalQuote())
}

export const handlePrice = (id: number, target: any) => (dispatch: any) => {
  dispatch(changePrice({ id, price: target.value }))
  dispatch(changePriceSelectedEquipment({ price: target.value }))
  dispatch(changeTotalEquipment({ id, total: target.value }))
  dispatch(calculateTotal())
  dispatch(calculateSubtotal())
  dispatch(calculateTotalQuote())
}

export const handleCount = (id: number, target: any) => (dispatch: any) => {
  dispatch(setCountEquipment({ id, count: target.value }))
  dispatch(calculateTotal())
  dispatch(calculateSubtotal())
  dispatch(calculateTotalQuote())
}

export const handleDiscount = (id: number, target: any) => (dispatch: any) => {
  if (target.value > 100) target.value = 99

  dispatch(changeDiscount({ id, discount: target.value }))
  dispatch(changeDiscountSelectedEquipment({ discount: target.value }))
  dispatch(calculateTotal())
  dispatch(calculateSubtotal())
  dispatch(calculateTotalQuote())
}

export const handleComment =
  (id: number, comment: string) => (dispatch: any) => {
    dispatch(setComment({ id, comment }))
    dispatch
  }

export const handleAdditionalRemarks =
  (id: number, additional_remarks: string) => (dispatch: any) => {
    dispatch(setAdditionalRemarks({ id, additional_remarks }))
  }

export const calculateTotal = () => (dispatch: any, getState: any) => {
  const { selectedEquipment } = getState().quote
  const { price, count, discount } = selectedEquipment || {
    price: 0,
    count: 0,
    discount: 0,
  }
  const total = price * count - (price * count * discount) / 100
  total.toFixed(2)
  dispatch(setTotal(total))
  dispatch(changeTotalEquipment({ id: selectedEquipment.id, total }))
}
export const calculateTotalQuote = () => (dispatch: any, getState: any) => {
  const { subtotal, discount, IVA, extras } = getState().quote

  let totalQuote = Number(subtotal)

  const totalDiscount = totalQuote * (Number(discount) / 100)

  totalQuote -= totalDiscount

  let totalIVA = totalQuote * (IVA / 100)

  totalQuote = Number(Number(totalQuote).toFixed(3))
  totalIVA = Number(Number(totalIVA).toFixed(3))

  dispatch(setIVAValue(totalIVA))
  dispatch(setDiscountValue(totalDiscount))
  dispatch(setTotalQuote((totalQuote + totalIVA).toFixed(3).slice(0, -1)))
}

export const calculateSubtotal = () => (dispatch: any, getState: any) => {
  const { equipment, extras } = getState().quote
  let subtotal = 0

  equipment.forEach((item: any) => {
    if (item.status !== 'rejected') subtotal += Number(item.total)
  })

  subtotal = subtotal + Number(extras)

  dispatch(setSubtotal(subtotal.toFixed(2)))
}

export const handleIVA = (target: any) => (dispatch: any) => {
  dispatch(setIVA(target.value))
  dispatch(calculateTotalQuote())
}

export const handleDiscountQuote = (target: any) => (dispatch: any) => {
  dispatch(setDiscountQuote(target.value))
  dispatch(calculateTotalQuote())
}

export const handleDeleteEquipmentFromQuote =
  (id: number) => (dispatch: any) => {
    dispatch(deleteEquipmentFromQuote({ id }))

    dispatch(calculateTotal())
    dispatch(calculateSubtotal())
    dispatch(calculateTotalQuote())
  }

export const handleDispatchOnLoad = (response: IQuote) => (dispatch: any) => {
  dispatch(setID(response.id))
  dispatch(setTotalPrice(response.price))
  dispatch(setStatus(response.status))
  dispatch(setDiscount(response.general_discount))
  dispatch(setClient(response.client))
  dispatch(setNo(response.no))
  dispatch(changeExtras(response.extras))
  dispatch(setEquipment(response.equipment_quote_request))
  dispatch(setSelectedEquipment(response.equipment_quote_request[0]))
  dispatch(setIVA(response.tax))
  dispatch(setTotalQuote(response.price))
  dispatch(calculateTotal())
  dispatch(calculateSubtotal())
  dispatch(calculateTotalQuote())
}
