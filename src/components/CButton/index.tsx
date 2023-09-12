interface CButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: any) => void
  disabled?: boolean
}

export const CButton = ({
  children,
  className,
  type,
  onClick,
  disabled,
}: CButtonProps) => {
  return (
    <button
      className={`c-button ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
