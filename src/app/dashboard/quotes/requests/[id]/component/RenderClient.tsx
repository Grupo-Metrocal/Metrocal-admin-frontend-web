import type { IClient } from '../page'
import { useAppSelector } from '@/redux/hook'
import { Building2, User, Phone, Mail, MapPin, Hash, FileText } from 'lucide-react'

interface IProps {
  client?: IClient
  alt_client_email?: string
  alt_client_requested_by?: string
  alt_client_phone?: string
}

const Field = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => (
  <div className="qreq__client-field">
    <span className="qreq__client-field-icon">{icon}</span>
    <div className="qreq__client-field-text">
      <span className="qreq__client-field-label">{label}</span>
      <span className="qreq__client-field-value">{value || '—'}</span>
    </div>
  </div>
)

export const RenderClient = ({ client, alt_client_email, alt_client_phone, alt_client_requested_by }: IProps) => {
  const { no } = useAppSelector((state) => state.quote)
  return (
    <div className="qreq__client-grid">
      <Field icon={<Building2 size={13} />} label="Empresa"        value={client?.company_name} />
      <Field icon={<Hash size={13} />}      label="N° cotización"  value={no} />
      <Field icon={<User size={13} />}      label="Solicitado por" value={alt_client_requested_by || client?.requested_by} />
      <Field icon={<Hash size={13} />}      label="No. RUC"        value={client?.no_ruc} />
      <Field icon={<Phone size={13} />}     label="Teléfono"       value={alt_client_phone || client?.phone} />
      <Field icon={<MapPin size={13} />}    label="Dirección"      value={client?.address} />
      <Field icon={<Mail size={13} />}      label="Correo"         value={alt_client_email || client?.email} />
    </div>
  )
}
