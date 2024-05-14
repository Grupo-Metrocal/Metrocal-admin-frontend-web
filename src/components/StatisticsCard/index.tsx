import './index.scss'
import arrowDownIcon from '@/assets/icons/arrow_down.svg'
import arrowUpIcon from '@/assets/icons/arrow_up.svg'
import Image from 'next/image'

interface StatisticsCardProps {
  title: string
  headerIcon?: any
  backgroundHeaderIcon?: string
  statsValue?: number
  contentValue: string
  typeIconStats?: string
  className?: string
}
export const StatisticsCard = ({
  title,
  headerIcon,
  statsValue,
  typeIconStats,
  contentValue,
  className,
  backgroundHeaderIcon,
}: StatisticsCardProps) => {
  return (
    <div className={`statistics-card ${className}`}>
      <div className="header">
        <div
          className="icon"
          style={{
            backgroundColor: backgroundHeaderIcon,
          }}
        >
          {headerIcon && (
            <Image src={headerIcon} alt="certificate" width={28} height={28} />
          )}
        </div>
        <div className="title">{title}</div>
        <div
          className="stats"
          style={{
            backgroundColor:
              typeIconStats === 'increase'
                ? 'rgb(84, 218, 63, 0.1)'
                : 'rgb(255, 99, 71, 0.1)',
            color: typeIconStats === 'increase' ? '#42B030' : '#FF6347',
          }}
        >
          {statsValue && (
            <Image
              src={typeIconStats === 'increase' ? arrowUpIcon : arrowDownIcon}
              alt="arrow-up"
              width={13}
              height={13}
            />
          )}
          {statsValue && (
            <span>{`${
              Number.isInteger(statsValue) ? statsValue : statsValue.toFixed(2)
            }% este mes`}</span>
          )}
        </div>
      </div>
      <div className="content">
        <span>{contentValue}</span>
      </div>
    </div>
  )
}
