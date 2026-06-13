'use client'
import type { IEquipmentQuoteRequest } from '../page'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { handleDeleteEquipmentFromQuote } from '@/redux/features/quote/quoteSlice'
import { CheckCircle2, Clock, XCircle, X, Ruler, Layers, Hash } from 'lucide-react'
import { formatPrice } from '@/utils/formatPrice'

interface IProps {
  equipment: IEquipmentQuoteRequest
  status: boolean
  onClick: () => void
  selected?: boolean
}

const STATUS_STYLE: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode; label: string }> = {
  done:     { color: '#059669', bg: '#ecfdf5', border: '#86efac', icon: <CheckCircle2 size={11} />, label: 'Aprobado'  },
  rejected: { color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', icon: <XCircle      size={11} />, label: 'Rechazado' },
  pending:  { color: '#d97706', bg: '#fffbeb', border: '#fcd34d', icon: <Clock        size={11} />, label: 'Pendiente' },
}

export const RenderEquipment = ({ equipment, onClick, selected }: IProps) => {
  const quote = useAppSelector((state) => state.quote)
  const dispatch = useAppDispatch()
  const s = STATUS_STYLE[equipment.status] ?? STATUS_STYLE.pending

  const handleDeleteEquipment = async () => {
    if (quote.equipment.length === 1) return toast('La cotización necesita al menos un servicio')
    toast.loading('Eliminando servicio')
    const response = await fetchData({
      url: 'quotes/equipment/delete-from-quote',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getCookie('token')}` },
      body: { equipmentID: equipment.id, quoteID: quote.id },
    })
    toast.dismiss()
    if (response.success) {
      toast.success('Servicio eliminado')
      dispatch(handleDeleteEquipmentFromQuote(equipment.id))
    } else {
      toast.error('No se pudo eliminar el servicio')
    }
  }

  return (
    <div
      className={`qreq__equip-card${selected ? ' qreq__equip-card--selected' : ''}`}
      style={{ borderLeftColor: s.border }}
      onClick={onClick}
      data-equipment-status={equipment.status}
    >
      {/* Header: name + delete */}
      <div className="qreq__equip-card-top">
        <span className="qreq__equip-card-name">{equipment.name}</span>
        <AlertDialog>
          <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="qreq__equip-card-del" title="Eliminar equipo">
              <X size={11} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent style={{ backgroundColor: '#fff' }}>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar servicio</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro de eliminar <strong>"{equipment.name}"</strong> de la cotización? Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel style={{ border: 'none' }}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteEquipment}
                style={{ background: '#dc2626', color: '#fff' }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Service type */}
      <span className="qreq__equip-card-type">{equipment.type_service || '—'}</span>

      {/* Meta row: model + range */}
      <div className="qreq__equip-card-meta">
        {equipment.model && (
          <span className="qreq__equip-card-meta-item">
            <Layers size={10} />{equipment.model}
          </span>
        )}
        {equipment.measuring_range && (
          <span className="qreq__equip-card-meta-item">
            <Ruler size={10} />{equipment.measuring_range}
          </span>
        )}
      </div>

      {/* Footer: count + price + status */}
      <div className="qreq__equip-card-footer">
        <div className="qreq__equip-card-stats">
          <span className="qreq__equip-card-stat">
            <Hash size={10} />{equipment.count}
          </span>
          {equipment.price > 0 && (
            <span className="qreq__equip-card-price">
              {formatPrice(equipment.price)}
            </span>
          )}
        </div>
        <span className="qreq__equip-card-badge" style={{ color: s.color, background: s.bg }}>
          {s.icon}{s.label}
        </span>
      </div>
    </div>
  )
}
