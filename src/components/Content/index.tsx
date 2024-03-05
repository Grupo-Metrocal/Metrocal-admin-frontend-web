import './index.scss'

interface IContentProps {
  children: React.ReactNode
  title: string
  titleStyle?: React.CSSProperties
  style?: React.CSSProperties
  colorTitle?: 'red' | 'blue' | 'green' | 'yellow' | 'purple'
  className?: string
}
export const Content = ({
  children,
  title,
  colorTitle,
  titleStyle,
  className,
  style,
}: IContentProps) => {
  return (
    <div className={`content-content ${className}`} style={style}>
      <div className="content__title">
        <h4
          className={`content__title__text ${colorTitle}`}
          data-color-title={colorTitle || 'blue'}
          style={titleStyle}
        >
          {title}
        </h4>
      </div>
      <div className="content__body">{children}</div>
    </div>
  )
}
