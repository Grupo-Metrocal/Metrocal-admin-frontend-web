'use client'
import { TAuthorizedServices } from "@/app/page"
import { renderTableTr } from "@/app/registerEquipment"
import { useForm } from "@/hooks/useForm"
import { codeGenerator } from "@/utils/codeGenerator"
import { fetchData } from "@/utils/fetch"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import './index.scss'
import { CInput } from "@/components/CInput"
import { PopoverSelected } from "@/components/poppoverSelected"
import { IClient } from "@/app/contactInformation"
import { CButton } from "@/components/CButton"
import { File, Upload, X } from "lucide-react"

export default function Page() {
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

  const {
    values: contactInfValue,
    setValues: setContactInfValue,
    handleInputChange,
  } = useForm(initialContactInformationForm)

  const [equipmentValue, setEquipmentValue] = useState<
    (typeof initialEquipmentForm)[]
  >([initialEquipmentForm])

  const [authorizedServices, setAuthorizedServices] = useState<
    TAuthorizedServices[]
  >([])

  const [companySelected, setCompanySelected] = useState(-1)
  const [clients, setClients] = useState<IClient[]>([])

  const [file, setFile] = useState<File | null>(null);
  const [extractExcelData, setExtractExcelData] = useState([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)

    const fileInput = document.getElementById("upload-file") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    toast.loading('Extrayendo informacion...')

    try {
      const response = await fetchData({
        url: 'quotes/upload-to-extract',
        method: 'POST',
        body: formData,
      })
      toast.dismiss()

      if (response.success) {
        toast.success('Información extraida correctamente')
        setExtractExcelData(response.data)
      } else {
        toast.error('Error al extraer la información', {
          description: 'Intentelo denuevo'
        })
      }

    } catch (error) {
      toast.error('error al subir el archivo')
    }
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

  const handleAddEquipment = () => {
    const id: number = codeGenerator({ length: 4 })
    const newEquipment = {
      ...initialEquipmentForm,
      id,
    } as typeof initialEquipmentForm

    setEquipmentValue([...equipmentValue, newEquipment])
  }

  const resetState = () => {
    setContactInfValue(initialContactInformationForm)
    setEquipmentValue([initialEquipmentForm])
    handleRemoveFile()
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

    fetchData({
      url: 'clients',
    }).then((data) => {
      if (data.status === 200) {
        setClients(data.data)
      }
    })

  }, [])

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
    setEquipmentValue(extractExcelData)
  }, [extractExcelData])

  return (
    <div className="m-4 mr-6 flex flex-col gap-4">

      <div className="bg-white p-4 rounded">
        <h3 className="font-bold">Nueva cotización</h3>
      </div>

      <div className="bg-white p-4 rounded flex items-center flex-col gap-4 justify-center">
        <span>Subir Archivo Excel</span>
        <label htmlFor="upload-file" className="bg-gray-200 flex w-20 h-20 items-center justify-center rounded-lg cursor-pointer">
          <Upload width={20} />
        </label>
        <span className="font-bold flex items-center gap-2 underline">
          {
            file?.name && <>
              <File />{file.name} <X width={18} className="text-red-500 ml-5 cursor-pointer  hover:text-red-700" onClick={handleRemoveFile} />
            </>
          }
        </span>
        <input type="file" hidden id="upload-file" onChange={handleFileChange} accept=".xlsx, .xls" />

        <CButton onClick={handleUpload} style={{ boxShadow: 'none' }}>
          Extraer Información
        </CButton>
      </div>

      <div className="contact-information__body">
        <section className="grid grid-cols-2 gap-4 p-4 bg-white rounded">
          <PopoverSelected
            list={
              Object.keys(clients).length > 0
                ? clients.map((client) => ({
                  id: client.id,
                  name: client.company_name,
                }))
                : []
            }
            value={contactInfValue.company_name}
            label="Empresa"
            name="company_name"
            onChange={handleInputChange}
            setItemSelected={setCompanySelected}
            placeholder="Escriba o seleccione su empresa"
          />

          <CInput
            label="Solicitado por"
            value={contactInfValue.requested_by}
            name="requested_by"
            onChange={handleInputChange}
            required={true}
            placeholder="Nombre de la persona que solicita el servicio"
          />

          {/* <CInput
            label="No."
            value={state.no}
            name="no"
            onChange={onChange}
            required={true}
          /> */}

          <CInput
            label="Teléfono"
            value={contactInfValue.phone}
            name="phone"
            onChange={handleInputChange}
            type="text"
            required={true}
            placeholder="Teléfono de la empresa o persona que solicita el servicio"
          />
          <CInput
            label="E-mail"
            value={contactInfValue.email}
            name="email"
            onChange={handleInputChange}
            type="email"
            required={true}
            placeholder="Correo electrónico de contacto"
          />

          <CInput
            label="Dirección"
            value={contactInfValue.address}
            name="address"
            onChange={handleInputChange}
            required={true}
            dissabled={true}
            placeholder="Dirección de la empresa"
          />

          <CInput
            label="No. RUC"
            value={contactInfValue.no_ruc}
            name="no_ruc"
            onChange={handleInputChange}
            required={true}
            dissabled={true}
            placeholder="Número de RUC de la empresa"
          />
        </section>
      </div >

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
              <span>Observaciones adicionales</span>
            </div>
          </div>
          <div className="table__body">
            {equipmentValue.map((item: any, index: number) => {
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

      <div className="bg-white p-4 rounded">
        <CButton onClick={handleSubmitQuoteRequest}>
          Crear cotización
        </CButton>
      </div>
    </div >
  )
}