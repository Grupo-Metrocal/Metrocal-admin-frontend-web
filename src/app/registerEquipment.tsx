import { useState, useRef, useEffect } from 'react'

interface IState {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: string
  calibration_method: string
  additional_remarks: string
}
interface IRegisterEquipmentProps {
  handleAddEquipment: () => void
  handleRemoveEquipment: (id: number) => void
  state: IState[]
}

export default function RegisterEquipment({
  state,
  handleAddEquipment,
}: IRegisterEquipmentProps) {
  const tableBodyRef = useRef<HTMLDivElement>(null)

  console.log('state', state)
  console.log('table ref', tableBodyRef)

  return (
    <div className="register-equipment">
      <h5>
        <span>Registre los equipos necesarios para la cotización</span>
        <span>Fecha: {new Date().toLocaleDateString()}</span>
      </h5>

      <div className="register-equipment__body">
        <section className="table">
          <div className="table__header">
            <div className="table__header__summary">
              <span>INFORMACIÓN DEL EQUIPO</span>
              <span>USO EXCLUSIVO DEL LABORATORIO</span>
            </div>
            <div className="table__header__th">
              <span>Tipo de servicio</span>
              <span>Equipo</span>
              <span>Cantidad</span>
              <span>Modelo</span>
              <span>Rango de medición</span>
              <span>Metodo de calibración</span>
              <span>Puntos de calibración y/u observaciones adicionales</span>
            </div>
          </div>
          <div className="table__body" ref={tableBodyRef}>
            {state.map((item, index) => {
              return renderTableTr({
                key: index,
                id: item.id,
                onChange: () => console.log('change'),
              })
            })}

            <div className="table__body__tr">
              <div className="table__body__tr__td">
                <button
                  className="table__body__tr__td__btn"
                  onClick={() => handleAddEquipment()}
                >
                  Agregar un nuevo equipo
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface ITableTrProps {
  id: number
  key: number
  onChange: (e: any) => void
}

const renderTableTr = ({ key, id, onChange }: ITableTrProps) => {
  return (
    <div className="table__body__tr" key={key} id={'tr' + id.toString()}>
      <div className="table__body__tr__td">
        <select name="type_service">
          <option value="">Calibración</option>
          <option value="">Verificación</option>
        </select>
      </div>
      <div className="table__body__tr__td">
        <input
          type="text"
          placeholder="Nombre del equipo"
          name="name"
          autoComplete="off"
        />
      </div>
      <div className="table__body__tr__td">
        <input type="number" placeholder="Cantidad" min="1" name="count" />
      </div>
      <div className="table__body__tr__td">
        <input type="text" placeholder="Modelo" name="model" />
      </div>
      <div className="table__body__tr__td">
        <input type="checkbox" name="measuring_range" />
      </div>
      <div className="table__body__tr__td">
        <select name="calibration_method">
          <option value="">Comp. Directa Trazable</option>
        </select>
      </div>
      <div className="table__body__tr__td">
        <select name="additional_remarks">
          <option value="">vacio</option>
        </select>
      </div>
    </div>
  )
}
