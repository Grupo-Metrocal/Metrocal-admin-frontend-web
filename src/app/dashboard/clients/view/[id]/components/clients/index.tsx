import { IClient } from '@/app/contactInformation'
import './index.scss'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Calendar,
  Pencil,
} from 'lucide-react'

interface IProps {
  client: IClient
}

export const ClientRenderer = ({ client }: IProps) => {
  const initials = (client.company_name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '?'

  return (
    <div className="renderer-client">
      <div className="renderer-client__header">
        <div className="renderer-client__avatar">{initials}</div>
        <div className="renderer-client__header-info">
          <h2 className="renderer-client__name">{client.company_name}</h2>
          <span className="renderer-client__badge">Cliente activo</span>
        </div>
      </div>

      <div className="renderer-client__body">
        <InfoItem icon={<Mail />} label="Correo electrónico" value={client.email} />
        <InfoItem icon={<Phone />} label="Teléfono" value={client.phone} />
        <InfoItem icon={<User />} label="Solicitante" value={client.requested_by} />
        <InfoItem icon={<MapPin />} label="Dirección" value={client.address} />
        <InfoItem icon={<FileText />} label="No. RUC" value={client.no_ruc} />
        {client.created_at && (
          <InfoItem
            icon={<Calendar />}
            label="Fecha de registro"
            value={new Date(client.created_at).toLocaleDateString('es-NI', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          />
        )}
      </div>

      <div className="renderer-client__footer">
        <Link
          href={`/dashboard/clients/update/${client.id}`}
          className="renderer-client__edit-btn"
        >
          <Pencil size={15} />
          Editar información
        </Link>
      </div>
    </div>
  )
}

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value?: string
}) => {
  if (!value) return null
  return (
    <div className="renderer-client__item">
      <div className="renderer-client__item-icon">{icon}</div>
      <div className="renderer-client__item-content">
        <span className="renderer-client__item-label">{label}</span>
        <span className="renderer-client__item-value">{value}</span>
      </div>
    </div>
  )
}
