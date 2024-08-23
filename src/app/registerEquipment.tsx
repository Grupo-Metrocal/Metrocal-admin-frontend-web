import RemoveIcon from '@/assets/icons/remove.svg'
import Image from 'next/image'
import { CButton } from '@/components/CButton'
import vectorIcon from '@/assets/icons/vector.svg'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import type { TAuthorizedServices } from './page'

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
  updateEquipmentValue: (id: number, target: any) => void
  handleBackStep: () => void
  handleSubmitQuoteRequest: () => void
  state: any
  authorizedServices: TAuthorizedServices[]
}

export default function RegisterEquipment({
  state,
  handleAddEquipment,
  handleRemoveEquipment,
  updateEquipmentValue,
  handleBackStep,
  handleSubmitQuoteRequest,
  authorizedServices,
}: IRegisterEquipmentProps) {
  return (
    <div className="register-equipment">
      <h5>
        <span>Registre los equipos necesarios para la cotización</span>
        <span className="date">Fecha: {new Date().toLocaleDateString()}</span>
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
              {/* <span>Metodo de calibración</span> */}
              <span>Observaciones adicionales</span>
            </div>
          </div>
          <div className="table__body">
            {state.map((item: IState, index: number) => {
              return renderTableTr({
                key: index,
                id: item.id,
                deleteEquipment: handleRemoveEquipment,
                onChange: () => { },
                updateEquipmentValue,
                state: item,
                authorizedServices: authorizedServices,
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

      <section className="controllers">
        <button
          className="controllers__btn__back"
          onClick={() => handleBackStep()}
        >
          <Image src={vectorIcon} alt="back" />
          REGRESAR
        </button>
        <CButton
          className="controllers__btn__next"
          onClick={handleSubmitQuoteRequest}
        >
          ENVIAR SOLICITUD
        </CButton>
      </section>
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
  authorizedServices: TAuthorizedServices[]
}

const renderTableTr = ({
  key,
  id,
  deleteEquipment,
  updateEquipmentValue,
  state,
  authorizedServices,
}: ITableTrProps) => {
  const equipmentList = authorizedServices.map(
    (service: TAuthorizedServices) => {
      return service.equipment
        ? {
          id: service.id,
          name: service.equipment,
        }
        : { id: 0, name: '' }
    },
  )

  console.log('equipmentList', equipmentList.length)

  const rangeList = authorizedServices.map((service: TAuthorizedServices) => {
    return state?.name === service.equipment && service.measuring_range !== ''
      ? {
        id: service.id,
        name: service.measuring_range,
      }
      : { id: 0, name: '' }
  })

  return (
    <div className="table__body__tr" key={key} id={'tr' + id.toString()}>
      <div className="table__body__tr__td">
        <select
          name="type_service"
          onChange={(e) => updateEquipmentValue(id, e.target)}
          value={state?.type_service}
        >
          <option value="" disabled>
            Seleccione
          </option>
          <option value="Calibracion">Calibración</option>
          <option value="Caracterización">Caracterización</option>
          <option value="Calificación">Calificación</option>
          <option value="Diagnóstico">Diagnóstico</option>
          <option value="Informe Técnico">Informe Técnico</option>
          <option value="Mant. Preventivo">Mant. Preventivo</option>
          <option value="Mant. Correctivo">Mant. Correctivo</option>
          <option value="Proyecto">Proyecto</option>
          <option value="Suministro">Suministro</option>
          <option value="Verificación de Cal">Verificación de Cal</option>
          <option value="Otros">Otros</option>
          <option value="(N/A)">No Aplica (N/A)</option>
        </select>
      </div>
      <div className="table__body__tr__td">
        <AutocompleteInput
          setItemSelected={(item: any) => {
            const selected = equipmentList.find((e: any) => e.id === item) || {
              name: '',
            }
            const target = { name: 'name', value: selected.name }
            updateEquipmentValue(id, target)
          }}
          onChange={(e) => {
            updateEquipmentValue(id, e)
          }}
          list={equipmentList}
          name="name"
          className="register-equipment__body__autocomplete"
          value={state?.name}
          placeholder="nombre del equipo"
          keyList="equipmentList"
        />
      </div>
      <div className="table__body__tr__td">
        <input
          type="number"
          placeholder="1"
          name="count"
          onChange={(e) => {
            if (Number(e.target.value) >= 0) {
              updateEquipmentValue(id, e.target)
            }
          }}
          value={state?.count}
          min={0}
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
        <AutocompleteInput
          setItemSelected={(item: any) => {
            const selected = rangeList.find((e: any) => e.id === item) || {
              name: '',
            }
            const target = { name: 'measuring_range', value: selected.name }
            updateEquipmentValue(id, target)
          }}
          onChange={(e) => {
            updateEquipmentValue(id, e)
          }}
          list={rangeList}
          name="measuring_range"
          value={state?.measuring_range}
          placeholder="(0 - 100) mm"
          keyList="rangeList"
        />
      </div>

      <div className="table__body__tr__td">
        <textarea
          placeholder="Escriba aquí"
          name="additional_remarks"
          className='w-full h-20 border'
          onChange={(e) => updateEquipmentValue(id, e.target)}
          value={state?.additional_remarks}
        />
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
