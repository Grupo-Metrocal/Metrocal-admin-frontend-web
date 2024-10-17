import type { IClient } from '../page'
import { useAppSelector } from '@/redux/hook'

interface IProps {
  client?: IClient
  alt_client_email?: string
  alt_client_requested_by?: string
  alt_client_phone?: string
}

export const RenderClient = ({ client, alt_client_email, alt_client_phone, alt_client_requested_by }: IProps) => {
  const { no } = useAppSelector((state) => state.quote)
  return (
    <>
      <div>
        <h5>
          Empresa: <span>{client?.company_name}</span>
        </h5>
        <h5>
          Solicitado por: <span>{alt_client_requested_by || client?.requested_by}</span>
        </h5>
        <h5>
          Teléfono: <span>{alt_client_phone || client?.phone}</span>
        </h5>
        <h5>
          Email: <span>{alt_client_email || client?.email}</span>
        </h5>
      </div>
      <div>
        <h5>
          No: <span>{no}</span>
        </h5>
        <h5>
          No RUC: <span>{client?.no_ruc}</span>
        </h5>
        <h5>
          Dirección: <span>{client?.address}</span>
        </h5>
      </div>
    </>
  )
}
