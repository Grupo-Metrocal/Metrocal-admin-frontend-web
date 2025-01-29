import React from 'react'
import './index.scss'
import Image from 'next/image'
interface CInputProps {
  value: string | number
  onChange: (e: any) => void
  placeholder?: string
  className?: string
  type?: string
  label?: string
  label_span?: string
  label_span_style?: React.CSSProperties
  required?: boolean
  name?: string
  id?: string
  icon?: any
  dissabled?: boolean
  min?: number
  max?: number
  input_style?: React.CSSProperties
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
  dissabled,
  min,
  max,
  label_span,
  label_span_style,
  input_style,
}: CInputProps) => {
  return (
    <div className={`c-input ${className}`}>
      {label && (
        <label className={`${required ? 'required' : ''}`} htmlFor={id}>
          {label}{' '}
          {label_span && (
            <span
              style={{
                fontWeight: 'bold',
                ...label_span_style,
              }}
            >
              - {label_span}
            </span>
          )}
        </label>
      )}

      <div className="c-input__container">
        {icon && <Image className="icon" src={icon} alt="icon" />}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target)}
          placeholder={placeholder}
          required={required}
          disabled={dissabled}
          min={min}
          max={max}
          style={input_style}
        />
      </div>
    </div>
  )
}
