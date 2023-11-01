'use client'
import './index.scss'
import Image from 'next/image'
import RollBackIcon from '@/assets/icons/rollback.svg'
import { useRouter } from 'next/navigation'

interface LayoutPageProps {
  children: React.ReactNode
  className?: string
  title: string
  rollBack?: boolean
  Footer?: React.FC
  subTitle?: string
}

export const LayoutPage = ({
  children,
  className,
  title,
  rollBack,
  Footer,
  subTitle,
}: LayoutPageProps) => {
  const router = useRouter()

  const handleRollBack = () => router.back()

  return (
    <section className={`layout-page ${className}`}>
      <div className="layout-page__header">
        <div className="layout-page__header__left">
          {rollBack && (
            <Image
              src={RollBackIcon}
              alt="RollBackIcon"
              onClick={handleRollBack}
            />
          )}
          <h1 className="layout-page__title">{title}</h1>
        </div>

        <div className="layout-page__header__right">
          <h4 className="layout-page__header__right__title">{subTitle}</h4>
        </div>
      </div>
      <div
        className="layout-page__content"
        style={{
          paddingBottom: Footer ? '8em' : '0',
        }}
      >
        {children}
      </div>
      {Footer && <footer className="layout-page__footer">{<Footer />}</footer>}
    </section>
  )
}
