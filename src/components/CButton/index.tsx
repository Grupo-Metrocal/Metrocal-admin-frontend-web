import './index.scss'

interface CButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: any) => void
  disabled?: boolean
  uppercase?: boolean
  widht?: 'full' | 'auto'
  style?: React.CSSProperties
  variant?: 'primary' | 'danger' | 'ghost'
}

export const CButton = ({
  children,
  className,
  type,
  onClick,
  disabled,
  uppercase,
  widht = 'auto',
  style,
  variant = 'primary',
}: CButtonProps) => {
  return (
    <button
      className={`c-button ${className ? className : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-uppercase={uppercase}
      data-width={widht}
      data-variant={variant}
      style={style}
    >
      {children}
    </button>
  )
}
