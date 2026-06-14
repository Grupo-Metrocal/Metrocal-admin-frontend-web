import './index.scss'
import Image from 'next/image'
import { TrendingUp, TrendingDown } from 'lucide-react'

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
  const isIncrease = typeIconStats === 'increase'
  const hasStats = statsValue !== undefined && statsValue !== null && statsValue !== 0
  const formatted = hasStats
    ? (Number.isInteger(statsValue) ? statsValue : statsValue!.toFixed(2))
    : null

  return (
    <div className={`statistics-card${className ? ` ${className}` : ''}`}>
      <div className="statistics-card__header">
        <div
          className="statistics-card__icon"
          style={{ backgroundColor: backgroundHeaderIcon ?? '#b1e5fd' }}
        >
          {headerIcon && (
            <Image src={headerIcon} alt={title} width={24} height={24} />
          )}
        </div>

        <span className="statistics-card__title">{title}</span>

        {hasStats && (
          <div className={`statistics-card__badge statistics-card__badge--${isIncrease ? 'up' : 'down'}`}>
            {isIncrease ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{formatted}%</span>
          </div>
        )}
      </div>

      <div className="statistics-card__content">
        <span>{contentValue ?? '—'}</span>
      </div>
    </div>
  )
}
