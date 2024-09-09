'use client'
import checkMarkIcon from '@/assets/icons/checkmark.svg'
import pencilIcon from '@/assets/icons/pencil.svg'
import xMarkIcon from '@/assets/icons/xmark.svg'
import Image from 'next/image'
import type { IEquipmentQuoteRequest } from '../page'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { toast } from 'sonner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { handleDeleteEquipmentFromQuote } from '@/redux/features/quote/quoteSlice'

interface IProps {
  equipment: IEquipmentQuoteRequest
  status: boolean
  onClick: () => void
  selected?: boolean
}

export const RenderEquipment = ({ equipment, onClick, selected }: IProps) => {
  const quote = useAppSelector(state => state.quote)
  const dispatch = useAppDispatch()

  const handleDeleteEquipment = async () => {

    if (quote.equipment.length === 1) {
      return toast('la cotizacion necesita un servicio vigente')
    }

    toast.loading('Eliminando servicio')

    const response = await fetchData({
      url: 'quotes/equipment/delete-from-quote',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: {
        equipmentID: equipment.id,
        quoteID: quote.id
      }
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Servicio eliminado de la cotización')
      dispatch(handleDeleteEquipmentFromQuote(equipment.id))
    } else {
      toast.error('Hubo un error al eliminar este servicio', {
        description: 'Porfavor vuelva a intentarlo'
      })
    }

  }

  return (
    <div
      className={`equipment 
      ${selected && 'equipment--selected'}
      ${equipment.status === 'rejected'
          ? 'equipment--rejected'
          : equipment.status === 'done'
            ? 'equipment--reviewed'
            : ''
        }
      `}
      onClick={onClick}
      data-equipment-status={equipment.status}
    >

      {/* <AlertDialogModal
        nameButton='X'
        onConfirm={handleDeleteEquipment}
        title='Eliminar servicio de la cotizacion'
        description='Estas seguro de eliminar este servicio de la cotización?, no podras recuperar la informacion eliminada'
        nameButtonConfirm='Eliminar'
        buttonStyle={{
          boxShadow: 'none',
          width: '20px',
          height: '20px',
          position: 'absolute',
          top: 0,
          background: '#333',
          borderRadius: '4px 10px 4px 4px',
          border: '4px solid #333',
          boxSizing: 'content-box',
          right: 0,
          padding: 0
        }}
      /> */}
      <div className="status">
        <div className="img">
          <Image
            src={
              equipment.status === 'done'
                ? checkMarkIcon
                : equipment.status === 'rejected'
                  ? xMarkIcon
                  : pencilIcon
            }
            alt="status"
          />
        </div>
        <small>{equipment.count}</small>
      </div>
      <span>{equipment.name}</span>
      <small>{equipment.type_service}</small>
    </div>
  )
}
