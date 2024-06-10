import { IClient } from '@/app/contactInformation'
import pencilIcon from '@/assets/icons/pencil.svg'
import './index.scss'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
  client: IClient
}
export const ClientRenderer = ({ client }: IProps) => {
  return (
    <div className="renderer-client relative">
      <Link
        href={`/dashboard/clients/update/${client.id}`}
        passHref
        className="bg-[#09f] p-2 rounded-full w-fit absolute right-0 top-0 hover:bg-[#0af] cursor-pointer"
      >
        <Image src={pencilIcon} alt="pencil icon" />
      </Link>
      <Item label="Empresa" value={client.company_name} />
      <Item label="Solicitante" value={client.requested_by} />
      <Item label="Email" value={client.email} />
      <Item label="Teléfono" value={client.phone} />
      <Item label="Dirección" value={client.address} />
      <Item label="No. RUC" value={client.no_ruc} />
    </div>
  )
}

const Item = ({ label, value }: { label: string; value?: string }) => {
  return (
    <div className="client-info__item">
      <span className="client-info__item__label">{label}:</span>
      <span className="client-info__item__value">{value || ''}</span>
    </div>
  )
}
