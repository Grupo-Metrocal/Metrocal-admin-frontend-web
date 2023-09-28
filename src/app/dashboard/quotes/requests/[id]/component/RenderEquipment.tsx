'use client'
import checkMarkIcon from '@/assets/icons/checkmark.svg'
import pencilIcon from '@/assets/icons/pencil.svg'
import xMarkIcon from '@/assets/icons/xmark.svg'
import Image from 'next/image'
import type { IEquipmentQuoteRequest } from '../page'

interface IProps {
  equipment: IEquipmentQuoteRequest
  status: boolean
  onClick: () => void
  selected?: boolean
}

export const RenderEquipment = ({ equipment, onClick, selected }: IProps) => {
  return (
    <div
      className={`equipment 
      ${selected && 'equipment--selected'}
      ${
        equipment.status === 'rejected'
          ? 'equipment--rejected'
          : equipment.status === 'done'
          ? 'equipment--reviewed'
          : ''
      }
      `}
      onClick={onClick}
    >
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
