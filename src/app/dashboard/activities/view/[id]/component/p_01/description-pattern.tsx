import { ReportMethodActivity } from '@/components/ReportMethodActivity'
import { IDescriptionPattern } from '../../interface/p_01'

interface Props {
  description_pattern: IDescriptionPattern
  id: number
  method_name: string
}
export const DescriptionPattern = ({
  description_pattern,
  id,
  method_name,
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
            <span className="font-semibold">Patrón:</span>{' '}
            {description_pattern.pattern}
          </div>
        </div>
      </div>
      <ReportMethodActivity
        method_name={method_name}
        zone={'Descripción del patrón'}
        method_id={id}
      />
    </div>
  )
}
