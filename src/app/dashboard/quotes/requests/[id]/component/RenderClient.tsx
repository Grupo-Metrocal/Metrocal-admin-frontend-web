'use client'
import type { IClient } from '../page'
export const RenderClient = ({ client }: { client?: IClient }) => {
  return (
    <>
      <div>
        <h5>
          Empresa: <span>{client?.company_name}</span>
        </h5>
        <h5>
          Solicitado por: <span>{client?.requested_by}</span>
        </h5>
        <h5>
          Teléfono: <span>{client?.phone}</span>
        </h5>
        <h5>
          Email: <span>{client?.email}</span>
        </h5>
      </div>
      <div>
        <h5>
          No: <span>{client?.no}</span>
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
