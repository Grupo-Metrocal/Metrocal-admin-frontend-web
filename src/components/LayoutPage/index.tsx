import './index.scss'

interface LayoutPageProps {
  children: React.ReactNode
  classNme?: string
  title: string
}

export const LayoutPage = ({ children, classNme, title }: LayoutPageProps) => {
  return (
    <section className={`layout-page ${classNme}`}>
      <div className="layout-page__header">
        <h1 className="layout-page__title">{title}</h1>
      </div>
      <div className="layout-page__content">{children}</div>
    </section>
  )
}
