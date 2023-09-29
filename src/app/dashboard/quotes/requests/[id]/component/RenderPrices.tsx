'use client'
import { CInput } from '@/components/CInput'
import dollarIcon from '@/assets/icons/dollar.svg'
import percentIcon from '@/assets/icons/percent.svg'
import { Content } from '@/components/Content'
import { CButton } from '@/components/CButton'
import { handlePrice, handleDiscount } from '@/redux/features/quote/quoteSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hook'

export const RenderPrices = () => {
  const selectedEquipment = useAppSelector(
    (state) => state.quote.selectedEquipment,
  )

  const total = useAppSelector((state) => state.quote.total)

  const dispatch = useAppDispatch()

  return (
    <Content title="Precios" colorTitle="purple" className="prices-equipment">
      <div className="prices">
        <div className="prices__item">
          <h4>Descuento</h4>
          <CInput
            type="number"
            name="discount"
            value={
              selectedEquipment?.discount
                ? selectedEquipment?.discount.toString()
                : ''
            }
            onChange={(e) =>
              dispatch(handleDiscount(selectedEquipment?.id || 0, e))
            }
            icon={percentIcon}
          />
        </div>
        <div className="prices__item">
          <h4>Precio unitario</h4>
          <CInput
            type="number"
            value={
              selectedEquipment?.price
                ? selectedEquipment?.price.toString()
                : ''
            }
            name="price"
            onChange={(e) =>
              dispatch(handlePrice(selectedEquipment?.id || 0, e))
            }
            icon={dollarIcon}
          />
        </div>
        <div className="prices__item">
          <h4>Equipos</h4>
          <CInput
            type="number"
            value={
              selectedEquipment?.count
                ? selectedEquipment?.count.toString()
                : ''
            }
            name="count"
            onChange={(e) => {}}
            icon={dollarIcon}
            dissabled={true}
          />
        </div>
        <div className="prices__item">
          <h4>Total</h4>
          <CInput
            type="number"
            value={total.toString()}
            onChange={(e) => {}}
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
