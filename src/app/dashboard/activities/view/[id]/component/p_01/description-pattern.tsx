import { IDescriptionPattern } from '../../interface/p_01'

export const DescriptionPattern = ({
  description_pattern,
}: {
  description_pattern: IDescriptionPattern
}) => {
  return (
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
  )
}
