import Image from "next/image"
import plusIcon from '@/assets/icons/plus.svg'
import { Modal } from "@/components/Modal"

export const AddEquipmentToQuoteButton = ({ Component }: { Component: React.FC }) => {
  return (
    <Modal
      title="Estas agregando un servicio a la cotización"
      description="Por favor complete los siguientes campos"
      Component={() => <Component />}
      buttonStyle={{ width: '100%' }}
    >
      <div className="w-full bg-gray-200 mt-5 rounded h-32 flex items-center justify-center cursor-pointer hover:bg-gray-300">
        <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
          <Image
            src={plusIcon}
            width={15}
            height={15}
            alt="Add equipment"
          />
        </div>
      </div>
    </Modal>
  )
}