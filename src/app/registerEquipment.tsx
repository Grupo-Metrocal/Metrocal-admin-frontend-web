import RemoveIcon from '@/assets/icons/remove.svg'
import Image from 'next/image'

interface IState {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: boolean
  calibration_method: string
  additional_remarks: string
}
interface IRegisterEquipmentProps {
  handleAddEquipment: () => void
  handleRemoveEquipment: (id: number) => void
  updateEquipmentValue: (id: number, target: any) => void
  state: any
}

export default function RegisterEquipment({
  state,
  handleAddEquipment,
  handleRemoveEquipment,
  updateEquipmentValue,
}: IRegisterEquipmentProps) {
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
            {state.map((item: IState, index: number) => {
              return renderTableTr({
                key: index,
                id: item.id,
                deleteEquipment: handleRemoveEquipment,
                onChange: () => console.log('change'),
                updateEquipmentValue,
                state: item,
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
  deleteEquipment: (id: number) => void
  updateEquipmentValue: (id: number, target: any) => void
  state?: IState
}

const renderTableTr = ({
  key,
  id,
  deleteEquipment,
  updateEquipmentValue,
  state,
}: ITableTrProps) => {
  return (
    <div className="table__body__tr" key={key} id={'tr' + id.toString()}>
      <div className="table__body__tr__td">
        <select
          name="type_service"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          defaultValue={state?.type_service}
          value={state?.type_service}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="Calibración">Calibración</option>
          <option value="Verificación">Verificación</option>
        </select>
      </div>
      <div className="table__body__tr__td">
        <input
          type="text"
          placeholder="Nombre del equipo"
          name="name"
          autoComplete="off"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          value={state?.name}
        />
      </div>
      <div className="table__body__tr__td">
        <input
          type="number"
          placeholder="0"
          name="count"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          value={state?.count}
        />
      </div>
      <div className="table__body__tr__td">
        <input
          type="text"
          placeholder="Modelo"
          name="model"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          value={state?.model}
        />
      </div>
      <div className="table__body__tr__td">
        <input
          type="checkbox"
          name="measuring_range"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          checked={state?.measuring_range}
        />
      </div>
      <div className="table__body__tr__td">
        <select
          name="calibration_method"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          defaultValue={state?.calibration_method}
          value={state?.calibration_method}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="Comp. Directa Trazable">Comp. Directa Trazable</option>
        </select>
      </div>
      <div className="table__body__tr__td">
        <select
          name="additional_remarks"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          defaultValue={state?.additional_remarks}
          value={state?.additional_remarks}
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="vacio">vacio</option>
        </select>
      </div>

      <div className="delete-equipment">
        <button
          className="delete-equipment__btn"
          onClick={() => deleteEquipment(id)}
        >
          <Image src={RemoveIcon} alt="remove" />
        </button>
      </div>
    </div>
  )
}
