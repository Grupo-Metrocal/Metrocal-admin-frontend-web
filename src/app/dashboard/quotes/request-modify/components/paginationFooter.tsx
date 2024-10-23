import { CButton } from '@/components/CButton'
import Image from 'next/image'
import refreshIcon from '@/assets/icons/refresh.svg'

type TPaginationFooter = {
  onClick: () => void
}
export const PaginationFooter = ({ onClick }: TPaginationFooter) => {
  return (
    <div className="flex justify-center">
      <CButton
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <Image src={refreshIcon} alt="" /> Cargar más
      </CButton>
    </div>
  )
}
