import './index.scss'

interface IContentProps {
  children: React.ReactNode
  title: string
  colorTitle?: 'red' | 'blue' | 'green' | 'yellow' | 'purple'
  className?: string
}
export const Content = ({
  children,
  title,
  colorTitle,
  className,
}: IContentProps) => {
  return (
    <div className={`content-content ${className}`}>
      <div className="content__title">
        <h4
          className={`content__title__text ${colorTitle}`}
          data-color-title={colorTitle || 'blue'}
        >
          {title}
        </h4>
      </div>
      <div className="content__body">{children}</div>
    </div>
  )
}
