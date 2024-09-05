import React from 'react'
import './index.scss'

interface IContentProps {
  children: React.ReactNode
  title: string
  titleStyle?: React.CSSProperties
  style?: React.CSSProperties
  colorTitle?: 'red' | 'blue' | 'green' | 'yellow' | 'purple'
  className?: string
  RightComponent?: React.FC
}
export const Content = ({
  children,
  title,
  colorTitle,
  titleStyle,
  className,
  style,
  RightComponent
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

        {RightComponent && <RightComponent />}
      </div>
      <div className="content__body">{children}</div>
    </div>
  )
}
