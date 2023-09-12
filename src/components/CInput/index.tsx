import './index.scss'
import Image from 'next/image'
interface CInputProps {
  value: string
  onChange: (e: any) => void
  placeholder?: string
  className?: string
  type?: string
  label?: string
  required?: boolean
  name?: string
  id?: string
  icon?: any
}
export const CInput = ({
  value,
  onChange,
  placeholder,
  className,
  type,
  label,
  required,
  name,
  id,
  icon,
}: CInputProps) => {
  return (
    <div className={`c-input ${className}`}>
      <label htmlFor={id}>{label}</label>

      <div className="c-input__container">
        {icon && <Image className="icon" src={icon} alt="icon" />}

        <input
          id={id}
          name={name}
          type={type}
          defaultValue={value}
          onChange={(e) => onChange(e.target)}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  )
}
