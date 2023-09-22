'use client'
import './page.scss'
import { useEffect, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import ContactInformation from './contactInformation'
import RegisterEquipment from './registerEquipment'
import { Controllers } from './controllers'
import { codeGenerator } from '@/utils/codeGenerator'
import { fetchData } from '@/utils/fetch'

const NOTE_ITEMS = [
  'En este campo se detallan los datos que son requeridos gor el cliente para el certificado de calibración.',
  'En este campo se definen los puntos específicos de calibración requeridos por el cliente.',
  'En este se especifica el método de calibración requerido por el cliente.',
  'En este campo se define el tipo de servicio requerido por el cliente.',
  'La tabla anterior es modificable. se pueden anexar las celdas necesarias hasta completar los datos de los equioos a calibrar.',
]

export default function Home() {
  const initialContactInformationForm = {
    company_name: '',
    address: '',
    requested_by: '',
    no: '',
    phone: '',
    email: '',
    no_ruc: '',
  }
  const initialEquipmentForm = {
    id: 1000,
    name: '',
    type_service: '',
    count: '',
    model: '',
    measuring_range: false,
    calibration_method: '',
    additional_remarks: '',
  }

  const [companySelected, setCompanySelected] = useState(-1)
  const {
    values: contactInfValue,
    setValues: setContactInfValue,
    handleInputChange,
  } = useForm(initialContactInformationForm)
  const [equipmentValue, setEquipmentValue] = useState<
    (typeof initialEquipmentForm)[]
  >([initialEquipmentForm])
  const [stepCounter, setStepCounter] = useState(1)

  const handleAddEquipment = () => {
    const id: number = codeGenerator({ length: 4 })
    const newEquipment = {
      ...initialEquipmentForm,
      id,
    } as typeof initialEquipmentForm

    setEquipmentValue([...equipmentValue, newEquipment])
  }

  const handleRemoveEquipment = (id: number) => {
    const newEquipment = equipmentValue.filter((item) => item.id !== id)
    setEquipmentValue(newEquipment)
  }

  const updateEquipmentValue = (id: number, target: any) => {
    let { name, value } = target

    if (name === 'measuring_range') {
      value = target.checked
    }

    if (name === 'count') {
      value === '' ? (value = '') : (value = parseInt(value))
    }

    const newEquipment = equipmentValue.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: value,
        }
      }
      return item
    })

    setEquipmentValue(newEquipment)
  }

  const handleSubmitQuoteRequest = () => {
    console.log(contactInfValue)
    console.log(equipmentValue)
  }

  useEffect(() => {
    if (companySelected === -1) return

    fetchData({ url: `clients/${companySelected}` }).then(
      (data: typeof contactInfValue) => {
        setContactInfValue(data)
      },
    )
  }, [companySelected])

  const handleNextStep = () => setStepCounter(stepCounter + 1)
  const handleBackStep = () => setStepCounter(stepCounter - 1)

  const RenderStep = () => {
    switch (stepCounter) {
      case 1:
        return (
          <ContactInformation
            onChange={handleInputChange}
            setItemSelected={setCompanySelected}
            state={contactInfValue}
            handleNextStep={handleNextStep}
          />
        )
      case 2:
        return (
          <RegisterEquipment
            handleAddEquipment={handleAddEquipment}
            handleRemoveEquipment={handleRemoveEquipment}
            state={equipmentValue}
            updateEquipmentValue={updateEquipmentValue}
            handleBackStep={handleBackStep}
            handleSubmitQuoteRequest={handleSubmitQuoteRequest}
          />
        )
    }
  }

  return (
    <>
      <main className="main">
        <header>
          <div className="main-image">
            <Image src={metrocalLogo} alt="Metrocal" />
          </div>
          <div className="main-title">
            <h4>
              <span>METROLOGÍA CONSULTORES DE NICARAGUA, S.A</span>
              <span>RUC : J0310000169420</span>
              <span>SOLICITUD DE SERVICIOS</span>
            </h4>
          </div>
          <div className="main-code">
            <h5>
              código
              <span>NI-R02-MCPR-02</span>
            </h5>
          </div>

          <span>
            Si aun no es cliente de Metrología Consultores de Nicaragua, S.A. y
            desea solicitar un servicio, por favor registrese en el siguiente
            enlace:{' '}
            <a
              style={{
                color: '#09f',
                fontWeight: 'bold',
              }}
              href="#"
            >
              Registro de clientes
            </a>
          </span>
        </header>

        <section className="main-controllers">
          <Controllers
            stepCounter={stepCounter}
            setStepCounter={setStepCounter}
          />
        </section>

        <section className="main-body">{RenderStep()}</section>
      </main>
      <footer>
        <div className="main-footer__signature">
          <div>
            <span>Elaborado por: </span>
            <span>__________NE__________</span>
          </div>

          <div className="main-footer__signature__review">
            <div>
              <span>Revisado y aprobado por: </span>
              <span>______________________</span>
            </div>
            <br />
            <div>
              <span>Fecha de aprobación: </span>
              <span>______________________</span>
            </div>
          </div>
        </div>

        <div className="main-footer__version">
          <h5>versión 1 Aprobado en NI-MCPR-02 v7 con fecha 2019-10-18</h5>
          <h5>METROLOGÍA CONSULTORES DE NICARAGUA, S.A</h5>
        </div>

        <div className="main-footer__note">
          {NOTE_ITEMS.map((item, index) => (
            <span key={index}>
              <span className="italic">{`Nota(${index + 1}): `}</span> {item}
            </span>
          ))}
        </div>

        <div className="main-footer__contact">
          <span>
            Bello Horizonte VI etapa. Iglesia Pio X 350 m este, Managua
          </span>
          <span>
            Tel: (505) 22490-758{' '}
            <a
              href="https://grupometrocal.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#09f',
                fontWeight: 'bold',
              }}
            >
              grupometrocal.com
            </a>{' '}
            , info@metrocal.co.ni
          </span>
        </div>
      </footer>
    </>
  )
}
