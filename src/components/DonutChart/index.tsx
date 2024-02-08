import { formatPrice } from '@/utils/formatPrice'
import { Card, DonutChart, Title } from '@tremor/react'
import { useState } from 'react'

interface IValue {
  name: string
  value: number
  id: any
}

interface iProps {
  data: IValue[]
  title: string
  onValueChange: (value: IValue) => void
}

export default function DonutChartComp({ data, title, onValueChange }: iProps) {
  const [value, setValue] = useState<any>()

  return (
    <>
      <Card className="mx-auto max-w-xs border-none">
        <Title className="font-semibold">{title}</Title>
        <DonutChart
          className="mt-6 border-none"
          data={data}
          category="value"
          index="name"
          showTooltip={true}
          valueFormatter={formatPrice}
          onValueChange={(value) => {
            setValue(onValueChange(value))
          }}
          customTooltip={(props) => {
            return (
              <div className="bg-white p-2 rounded-md shadow-md">
                <p>
                  {props?.payload[0]?.name} :{' '}
                  {formatPrice(props?.payload[0]?.value)}
                </p>
              </div>
            )
          }}
        />
      </Card>
      <span>{value && value}</span>
    </>
  )
}
