'use client'
import './page.scss'
import { useEffect, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import ContactInformation from './contactInformation'
import RegisterEquipment from './registerEquipment'
import ClientRegister from './clientRegister'
import { Controllers } from './controllers'
import { codeGenerator } from '@/utils/codeGenerator'
import { fetchData } from '@/utils/fetch'
import { Toaster, toast } from 'sonner'
import { Modal } from '@/components/Modal'
import { useRouter } from 'next/navigation'
import { FooterComponent } from './footer'

export type TAuthorizedServices = {
  id: number
  method: string
  service: string
  equipment: string
  measuring_range: string
  accuracy: string
  document_delivered: string
  price: number
}

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
    measuring_range: '',
    calibration_method: '',
    additional_remarks: '',
  }

  const router = useRouter()

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

  const [authorizedServices, setAuthorizedServices] = useState<
    TAuthorizedServices[]
  >([])

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
    if (!isInfoContactValid()) {
      toast.error('Por favor, seleccione la empresa desde donde solicita')
      return
    }

    if (!isEquipmentValid()) {
      toast.error('Por favor, complete los siguientes campos', {
        description:
          'Tipo de servicio, Equipo, Cantidad, y Modelo son campos obligatorios',
      })
      return
    }

    if (equipmentValue.length === 0) {
      toast.error('Por favor, agregue al menos un equipo')
      return
    }

    toast.loading('Enviando solicitud...')

    const requestBody = {
      client_id: companySelected,
      equipment_quote_request: equipmentValue.map((item) => {
        const { id, ...rest } = item
        return { ...rest, discount: 0 }
      }),
      general_discount: 0,
      tax: 0,
      price: 0,
      alt_client_email: contactInfValue.email,
      alt_client_phone: contactInfValue.phone,
      alt_client_requested_by: contactInfValue.requested_by,
    }

    fetchData({
      url: 'quotes/request',
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        toast.dismiss()

        if (res.status === 200) {
          toast.success('Solicitud enviada con éxito', {
            description:
              'En breve nos pondremos en contacto con usted. Gracias por preferirnos 👋',
          })

          resetState()
          return
        }

        return toast.error('Ocurrió un error al enviar la solicitud', {
          description: res.message,
        })
      })
      .catch((err) => {
        toast.dismiss()
        toast.error('Ocurrió un error al enviar la solicitud', {
          description: 'Por favor, intente nuevamente',
        })
      })
  }

  const isInfoContactValid = () => {
    const { company_name, address, requested_by, phone, email } =
      contactInfValue
    if (!company_name || !address || !requested_by || !phone || !email) {
      return false
    }
    return true
  }

  const isEquipmentValid = () => {
    const equipment = equipmentValue.filter(
      (item) =>
        item.name === '' ||
        item.count === '' ||
        item.model === '' ||
        item.type_service === '' ||
        item.measuring_range === '',
    )

    if (equipment.length > 0) {
      return false
    }
    return true
  }

  const resetState = () => {
    setContactInfValue(initialContactInformationForm)
    setEquipmentValue([initialEquipmentForm])
    setStepCounter(1)
  }

  useEffect(() => {
    if (companySelected === -1) {
      return setContactInfValue({
        ...initialContactInformationForm,
      })
    }

    fetchData({ url: `clients/${companySelected}` }).then(
      (data: typeof contactInfValue) => {
        if (data.status === 200) {
          setContactInfValue(data.data)
        } else {
          setContactInfValue({})
        }
      },
    )
  }, [companySelected, setContactInfValue])

  useEffect(() => {
    toast.loading('Cargando información...')
    fetchData({ url: 'configuration/all/authorized_services' })
      .then((res) => {
        if (res.success) {
          setAuthorizedServices(res.data)
        } else {
          toast.error('Ocurrió un error al cargar la información', {
            description: res.details,
          })
        }
      })
      .catch((err) => {
        toast.error('Ocurrió un error al cargar la información', {
          description: 'Por favor, intente nuevamente',
        })
      })
      .finally(() => toast.dismiss())
  }, [])

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
            authorizedServices={authorizedServices}
          />
        )
    }
  }

  return (
    <>
      <main className="main">
        <header>
          <div className="main-image">
            <Image
              src={metrocalLogo}
              alt="Metrocal"
              onDoubleClick={() => router.push('/login/signin')}
            />
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

          <span className="main-header__note">
            Si aun no es cliente de Metrología Consultores de Nicaragua, S.A. y
            desea solicitar un servicio, por favor registrese en el siguiente
            enlace:{' '}
            <Modal
              nameButton="Registro de clientes"
              title="Complete el formulario para registrarse"
              Component={ClientRegister}
              buttonStyle={{
                color: '#09f',
                fontWeight: 'bold',
              }}
              size="xl"
            />
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

      <FooterComponent requested_by={contactInfValue.requested_by} />
      <Toaster closeButton />
    </>
  )
}
