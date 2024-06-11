import { IClient } from '@/app/contactInformation'
import './index.scss'

interface IProps {
  client: IClient
}
export const ClientRenderer = ({ client }: IProps) => {
  return (
    <div className="renderer-client">
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
