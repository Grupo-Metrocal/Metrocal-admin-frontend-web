import { useState } from 'react'

interface IRegisterEquipmentProps {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: string
  calibration_method: string
  additional_remarks: string
}

export default function RegisterEquipment() {
  const [equipmentRendered, setEquipmentRendered] = useState(1)
  const [equipment, setEquipment] = useState<IRegisterEquipmentProps[]>([])

  const handleAddEquipment = () => {}

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
          <div className="table__body">
            {Array(equipmentRendered)
              .fill(0)
              .map((_, i) => renderTableTr({} as ITableTrProps))}
          </div>
        </section>
      </div>
    </div>
  )
}

interface ITableTrProps {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: string
  calibration_method: string
  additional_remarks: string
}

const renderTableTr = ({
  id,
  name,
  type_service,
  count,
  model,
  measuring_range,
  calibration_method,
  additional_remarks,
}: ITableTrProps) => {
  return (
    <div className="table__body__tr" key={id}>
      <div className="table__body__tr__td">
        <select name="" id="">
          <option value="">Calibración</option>
          <option value="">Verificación</option>
        </select>
      </div>
      <div className="table__body__tr__td">
        <input type="text" placeholder="Nombre del equipo" />
      </div>
      <div className="table__body__tr__td">
        <input type="number" placeholder="Cantidad" min="1" />
      </div>
      <div className="table__body__tr__td">
        <input type="text" placeholder="Modelo" />
      </div>
      <div className="table__body__tr__td">
        <input type="checkbox" />
      </div>
      <div className="table__body__tr__td">
        <select name="" id="">
          <option value="">Comp. Directa Trazable</option>
        </select>
      </div>
      <div className="table__body__tr__td">
        <select name="" id="">
          <option value="">vacio</option>
        </select>
      </div>
    </div>
  )
}
