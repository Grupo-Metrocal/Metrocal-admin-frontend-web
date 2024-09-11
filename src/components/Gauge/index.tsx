import { ChevronUp } from 'lucide-react'

interface IGauge {
  label: string
  value: string
  increase: number
  titleStyles?: string
  valueStyles?: string
}

export const Gauge = ({ value, label, increase, titleStyles, valueStyles }: IGauge) => {
  return (
    <div className="p-4 rounded-sm flex flex-col gap-4 max-w-[300px]">
      <div className='flex items-center gap-4'>
        <h3 className={`text-2xl font-semibold text-gray-800 text-center w-full ${titleStyles}`}>{value}</h3>
        <div className='flex gap-1 items-center'>
          {
            increase !== 0 && (
              <>
                <ChevronUp width={15} className={`${increase < 0 ? 'text-red-500 rotate-180' : 'text-green-500'}`} />
                <span className={`text-xs font-semibold ${increase < 0 ? 'text-red-500' : 'text-green-500'}`}>{increase}%</span>
              </>
            )
          }
        </div>
      </div>
      <span className={`text-gray-500 text-sm text-center ${valueStyles}`}>{label}</span>
    </div>
  )
}

export const SeparatorLine = () => {
  return <div className="border" />
}