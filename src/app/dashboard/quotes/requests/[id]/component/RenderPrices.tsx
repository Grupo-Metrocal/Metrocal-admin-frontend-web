'use client'
import { CInput } from '@/components/CInput'
import dollarIcon from '@/assets/icons/dollar.svg'
import percentIcon from '@/assets/icons/percent.svg'
import { Content } from '@/components/Content'
import { CButton } from '@/components/CButton'
import {
  handlePrice,
  handleDiscount,
  handleStatus,
  calculateSubtotal,
  calculateTotalQuote,
  setCountEquipment,
  handleCount,
} from '@/redux/features/quote/quoteSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { fetchData } from '@/utils/fetch'
import { toast } from 'sonner'

export const RenderPrices = () => {
  const selectedEquipment = useAppSelector(
    (state) => state.quote.selectedEquipment,
  )

  const dispatch = useAppDispatch()

  const handleApprove = async () => {
    if (!selectedEquipment) return

    if (!selectedEquipment.calibration_method) {
      toast.error('Seleccione un metodo de calibración')
      return
    }

    if (selectedEquipment.count < 1) {
      toast.error('La cantidad debe ser mayor a 0')
      return
    }

    if (!selectedEquipment.price) {
      toast.error('El precio unitario no puede estar vacío')
      return
    }

    if (!selectedEquipment.name) {
      toast.error('El nombre del equipo no puede estar vacío')
      return
    }

    dispatch(handleStatus(selectedEquipment?.id || 0, 'done'))
    const equipment = {
      ...selectedEquipment,
      status: 'done',
    }

    toast.loading('Aprobando equipo...')

    const response = await fetchData({
      method: 'POST',
      url: `quotes/request/equipment/update`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: equipment,
    })

    toast.dismiss()

    if (response.status === 200) {
      toast.success('Equipo aprobado')
    } else {
      dispatch(handleStatus(selectedEquipment?.id || 0, 'waiting'))
      toast.error('No se pudo aprobar el equipo', {
        description: 'Hubo un error inesperado',
      })
    }

    dispatch(calculateSubtotal())
    dispatch(calculateTotalQuote())
  }

  const handleReject = async () => {
    dispatch(handleStatus(selectedEquipment?.id || 0, 'rejected'))
    const equipment = {
      ...selectedEquipment,
      status: 'rejected',
    }

    toast.loading('Rechazando equipo...')
    const response = await fetchData({
      method: 'POST',
      url: `quotes/request/equipment/update`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: equipment,
    })

    toast.dismiss()

    if (response.status === 200) {
      toast.success('Equipo no aprobado')
    } else {
      dispatch(handleStatus(selectedEquipment?.id || 0, 'waiting'))
      toast.error('No se pudo rechazar el equipo', {
        description: 'Hubo un error inesperado',
      })
    }

    dispatch(calculateSubtotal())
    dispatch(calculateTotalQuote())
  }

  return (
    <Content title="Precios" colorTitle="purple" className="prices-equipment">
      <div className="prices">
        <div className="prices__item">
          <CInput
            type="number"
            label="Precio unitario"
            value={
              selectedEquipment.price ? selectedEquipment.price.toString() : ''
            }
            name="price"
            onChange={(e) =>
              dispatch(handlePrice(selectedEquipment.id || 0, e))
            }
            icon={dollarIcon}
          />
        </div>
        <div className="prices__item">
          <CInput
            type="number"
            label="Descuento"
            name="discount"
            value={
              selectedEquipment?.discount
                ? selectedEquipment.discount.toString()
                : ''
            }
            onChange={(e) =>
              dispatch(handleDiscount(selectedEquipment.id || 0, e))
            }
            icon={percentIcon}
          />
        </div>

        <div className="prices__item">
          <CInput
            type='number'
            label="Cantidad"
            value={
              selectedEquipment?.count?.toString() || ''
            }
            name="count"
            onChange={e => dispatch(handleCount(
              selectedEquipment?.id,
              e,
            ))}
          />
        </div>
        <div className="prices__item">
          <CInput
            type="number"
            label="Total"
            value={
              selectedEquipment.total ? selectedEquipment.total.toFixed(2) : ''
            }
            onChange={(_) => { }}
            icon={dollarIcon}
            dissabled={true}
          />
        </div>
      </div>

      <div className="prices__footer">
        <CButton
          style={{
            background: 'none',
            color: 'tomato',
            boxShadow: 'none',
          }}
          onClick={handleReject}
        >
          Rechazar equipo
        </CButton>
        <CButton style={{ boxShadow: 'none' }} onClick={handleApprove}>
          Aprobar equipo
        </CButton>
      </div>
    </Content>
  )
}
