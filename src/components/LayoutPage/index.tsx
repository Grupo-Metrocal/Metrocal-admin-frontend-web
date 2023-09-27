'use client'
import './index.scss'
import Image from 'next/image'
import RollBackIcon from '@/assets/icons/rollback.svg'
import { useRouter } from 'next/navigation'

interface LayoutPageProps {
  children: React.ReactNode
  classNme?: string
  title: string
  rollBack?: boolean
}

export const LayoutPage = ({
  children,
  classNme,
  title,
  rollBack,
}: LayoutPageProps) => {
  const router = useRouter()

  const handleRollBack = () => router.back()

  return (
    <section className={`layout-page ${classNme}`}>
      <div className="layout-page__header">
        {rollBack && (
          <Image
            src={RollBackIcon}
            alt="RollBackIcon"
            onClick={handleRollBack}
          />
        )}
        <h1 className="layout-page__title">{title}</h1>
      </div>
      <div className="layout-page__content">{children}</div>
    </section>
  )
}
