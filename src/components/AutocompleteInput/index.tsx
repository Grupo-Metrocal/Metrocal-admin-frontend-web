import './index.scss'
import { useEffect, useRef, useState } from 'react'

interface IList {
  id: number
  name: string
}

interface IAutocompleteInputProps {
  onChange: (e: any) => void
  placeholder?: string
  list: IList[]
  className?: string
  label?: string
  required?: boolean
  name: string
  id?: string
  requiredLabel?: boolean
  value?: string
  setItemSelected?: (id: number) => void
  keyList?: string
}
export const AutocompleteInput = ({
  onChange,
  requiredLabel,
  placeholder,
  list,
  className,
  label,
  required,
  name,
  id,
  value,
  setItemSelected,
  keyList,
}: IAutocompleteInputProps) => {
  const datalistRef = useRef<HTMLDataListElement>(null)
  const [listState, setListState] = useState<IList[]>(list)

  useEffect(() => {
    setListState(list)
  }, [list, keyList]) // Agregamos keyList a las dependencias

  return (
    <div className={`autocomplete-input ${className}`}>
      <label htmlFor={`autocomplete-input-${keyList}`}>
        {label && (
          <span className={requiredLabel ? 'required' : ''}>{label}</span>
        )}
        <input
          list={`autocomplete-input-list-${keyList}`}
          placeholder={placeholder}
          required={required}
          name={name}
          value={value}
          id={id}
          autoComplete="off"
          onChange={(e) => {
            onChange(e.target)
            const option = datalistRef.current?.querySelector(
              `option[value="${e.target.value}"]`,
            )
            setItemSelected && setItemSelected(option ? +option.id : -1)

            onChange(e.target)
          }}
        />
      </label>

      <datalist id={`autocomplete-input-list-${keyList}`} ref={datalistRef}>
        {listState ? (
          listState.map((item) => (
            <option key={item.id} value={item.name} id={item.id.toString()}>
              {item.name}
            </option>
          ))
        ) : (
          <option value="No hay datos" />
        )}
      </datalist>
    </div>
  )
}
