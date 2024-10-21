import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IDescriptionPattern } from '../../interface/b_01'
import { formatDate } from '@/utils/formatDate'

interface Props {
  description_pattern: IDescriptionPattern
  id: number
  method_name: string
  report_status: boolean
  report_messages: string[]
}
export const DescriptionPattern = ({
  description_pattern,
  id,
  method_name,
  report_status,
  report_messages,
}: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-semibold">Observaciones:</span>{' '}
            {description_pattern?.observation}
          </div>
          <div>
            <span className="font-semibold">Mostrar tabla de conversion:</span>{' '}
            {description_pattern?.show_additional_table || 'No mostrar'}
          </div>
          <div>
            <span className="font-semibold">Fecha de siguiente calibración:</span>{' '}
            {description_pattern?.next_calibration ? formatDate(description_pattern?.next_calibration) : 'No definido'}
          </div>
        </div>
        <div className="pt-4">
          <span className="font-semibold">
            Este certificado{' '}
            {description_pattern?.creditable
              ? 'es Acreditado ✅'
              : 'no es acreditado'}
          </span>
        </div>
      </div>
      <ReportMethodActivity
        method_name={method_name}
        zone={'Descripción del patrón'}
        method_id={id}
        report_messages={report_messages}
        report_status={report_status}
      />
    </div>
  )
}
