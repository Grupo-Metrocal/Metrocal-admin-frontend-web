'use client'
import { useState } from 'react'
import { CInput } from '@/components/CInput'
import dollarIcon from '@/assets/icons/dollar.svg'
import percentIcon from '@/assets/icons/percent.svg'
import { Content } from '@/components/Content'
import { CButton } from '@/components/CButton'
import type { IEquipmentQuoteRequest } from '../page'
export const RenderPrices = ({
  equipment,
}: {
  equipment?: IEquipmentQuoteRequest
}) => {
  const [discount, setDiscount] = useState<number>(equipment?.discount || 0)
  const [price, setPrice] = useState<number>(equipment?.discount || 0)
  const [total, setTotal] = useState<number>(equipment?.discount || 0)

  console.log(equipment)

  return (
    <Content title="Precios" colorTitle="purple" className="prices-equipment">
      <div className="prices">
        <div className="prices__item">
          <h4>Descuento</h4>
          <CInput
            type="number"
            value={discount.toString()}
            onChange={(e) => setDiscount(Number(e.value))}
            icon={percentIcon}
          />
        </div>
        <div className="prices__item">
          <h4>Precio unitario</h4>
          <CInput
            type="number"
            value={price.toString()}
            onChange={(e) => setPrice(Number(e.value))}
            icon={dollarIcon}
          />
        </div>
        <div className="prices__item">
          <h4>Equipos</h4>
          <CInput
            type="number"
            value={equipment ? equipment.count.toString() : ''}
            onChange={(e) => {}}
            icon={dollarIcon}
          />
        </div>
        <div className="prices__item">
          <h4>Total</h4>
          <CInput
            type="number"
            value={total.toString()}
            onChange={(e) => setTotal(Number(e.value))}
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
        >
          Rechazar equipo
        </CButton>
        <CButton style={{ boxShadow: 'none' }}>Aprobar equipo</CButton>
      </div>
    </Content>
  )
}
