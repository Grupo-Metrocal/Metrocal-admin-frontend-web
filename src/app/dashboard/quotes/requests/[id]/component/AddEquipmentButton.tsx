import { Modal } from '@/components/Modal'
import { Plus } from 'lucide-react'

export const AddEquipmentToQuoteButton = ({ Component }: { Component: React.FC }) => {
  return (
    <Modal
      title="Agregar servicio a la cotización"
      description="Por favor complete los siguientes campos"
      Component={() => <Component />}
      buttonStyle={{ width: '100%', background: 'none', boxShadow: 'none', padding: 0, border: 'none' }}
    >
      <div className="qreq__add-equip-btn">
        <div className="qreq__add-equip-btn-icon">
          <Plus size={16} />
        </div>
        <span>Agregar equipo</span>
      </div>
    </Modal>
  )
}
