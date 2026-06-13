'use client'
import { CInput } from '@/components/CInput'
import nioIcon from '@/assets/icons/nio.svg'
import percentIcon from '@/assets/icons/percent.svg'
import {
  handlePrice,
  handleDiscount,
  handleStatus,
  calculateSubtotal,
  calculateTotalQuote,
  handleCount,
} from '@/redux/features/quote/quoteSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { fetchData } from '@/utils/fetch'
import { toast } from 'sonner'
import { CheckCircle2, XCircle } from 'lucide-react'

export const RenderPrices = () => {
  const selectedEquipment = useAppSelector((state) => state.quote.selectedEquipment)
  const dispatch = useAppDispatch()

  const handleApprove = async () => {
    if (!selectedEquipment) return
    if (!selectedEquipment.calibration_method) return toast.error('Seleccione un método de calibración')
    if (selectedEquipment.count < 1) return toast.error('La cantidad debe ser mayor a 0')
    if (!selectedEquipment.price) return toast.error('El precio unitario no puede estar vacío')
    if (!selectedEquipment.name) return toast.error('El nombre del equipo no puede estar vacío')

    dispatch(handleStatus(selectedEquipment?.id || 0, 'done'))
    toast.loading('Aprobando equipo...')

    const response = await fetchData({
      method: 'POST',
      url: `quotes/request/equipment/update`,
      headers: { 'Content-Type': 'application/json' },
      body: { ...selectedEquipment, status: 'done' },
    })

    toast.dismiss()
    if (response.status === 200) {
      toast.success('Equipo aprobado')
    } else {
      dispatch(handleStatus(selectedEquipment?.id || 0, 'waiting'))
      toast.error('No se pudo aprobar el equipo')
    }

    dispatch(calculateSubtotal())
    dispatch(calculateTotalQuote())
  }

  const handleReject = async () => {
    dispatch(handleStatus(selectedEquipment?.id || 0, 'rejected'))
    toast.loading('Rechazando equipo...')

    const response = await fetchData({
      method: 'POST',
      url: `quotes/request/equipment/update`,
      headers: { 'Content-Type': 'application/json' },
      body: { ...selectedEquipment, status: 'rejected' },
    })

    toast.dismiss()
    if (response.status === 200) {
      toast.success('Equipo no aprobado')
    } else {
      dispatch(handleStatus(selectedEquipment?.id || 0, 'waiting'))
      toast.error('No se pudo rechazar el equipo')
    }

    dispatch(calculateSubtotal())
    dispatch(calculateTotalQuote())
  }

  return (
    <div className="qreq__prices">
      <div className="qreq__prices-grid">
        <CInput
          type="number"
          label="Precio unitario"
          value={selectedEquipment?.price ?? ''}
          name="price"
          onChange={(e) => dispatch(handlePrice(selectedEquipment.id, e))}
          icon={nioIcon}
        />
        <CInput
          type="number"
          label="Descuento"
          name="discount"
          value={selectedEquipment?.discount ?? ''}
          onChange={(e) => dispatch(handleDiscount(selectedEquipment.id || 0, e))}
          icon={percentIcon}
        />
        <CInput
          type="number"
          label="Cantidad"
          value={selectedEquipment?.count}
          name="count"
          onChange={(e) => dispatch(handleCount(selectedEquipment?.id, e))}
        />
        <CInput
          type="number"
          label="Total"
          value={selectedEquipment?.total?.toFixed(2)}
          onChange={() => {}}
          icon={nioIcon}
          dissabled
        />
      </div>

      <div className="qreq__prices-actions">
        <button className="qreq__prices-btn qreq__prices-btn--reject" onClick={handleReject}>
          <XCircle size={14} />Rechazar equipo
        </button>
        <button className="qreq__prices-btn qreq__prices-btn--approve" onClick={handleApprove}>
          <CheckCircle2 size={14} />Aprobar equipo
        </button>
      </div>
    </div>
  )
}
