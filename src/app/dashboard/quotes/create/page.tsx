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
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Hash,
  FileSpreadsheet,
  Upload,
  X,
  File,
  Plus,
  Info,
  FileText,
  Wrench,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
} from "lucide-react"

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

  const initialCertForm = {
    alt_company_name: '',
    alt_address: '',
    alt_email: '',
  }

  const {
    values: contactInfValue,
    setValues: setContactInfValue,
    handleInputChange,
  } = useForm(initialContactInformationForm)

  const {
    values: certValues,
    handleInputChange: handleCertChange,
    setValues: setCertValues,
  } = useForm(initialCertForm)

  const [equipmentValue, setEquipmentValue] = useState<
    (typeof initialEquipmentForm)[]
  >([initialEquipmentForm])

  const [authorizedServices, setAuthorizedServices] = useState<
    TAuthorizedServices[]
  >([])

  const [companySelected, setCompanySelected] = useState(-1)
  const [clients, setClients] = useState<IClient[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [extractExcelData, setExtractExcelData] = useState([])
  const [showCertSection, setShowCertSection] = useState(false)

  const hasCertData =
    certValues.alt_company_name || certValues.alt_address || certValues.alt_email

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    const fileInput = document.getElementById("upload-file") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    toast.loading('Extrayendo información...')
    try {
      const response = await fetchData({
        url: 'quotes/upload-to-extract',
        method: 'POST',
        body: formData,
      })
      toast.dismiss()
      if (response.success) {
        toast.success('Información extraída correctamente')
        setExtractExcelData(response.data)
      } else {
        toast.error('Error al extraer la información', {
          description: 'Inténtelo de nuevo',
        })
      }
    } catch {
      toast.dismiss()
      toast.error('Error al subir el archivo')
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
      if (item.id === id) return { ...item, [name]: value }
      return item
    })
    setEquipmentValue(newEquipment)
  }

  const handleAddEquipment = () => {
    const id: number = codeGenerator({ length: 4 })
    const newEquipment = { ...initialEquipmentForm, id } as typeof initialEquipmentForm
    setEquipmentValue([...equipmentValue, newEquipment])
  }

  const resetState = () => {
    setContactInfValue(initialContactInformationForm)
    setCertValues(initialCertForm)
    setEquipmentValue([initialEquipmentForm])
    setShowCertSection(false)
    handleRemoveFile()
  }

  const handleSubmitQuoteRequest = () => {
    if (!isInfoContactValid()) {
      toast.error('Por favor, seleccione la empresa y complete los datos de contacto')
      return
    }
    if (!isEquipmentValid()) {
      toast.error('Por favor, complete los campos requeridos de cada equipo', {
        description: 'Tipo de servicio, Equipo, Cantidad y Modelo son obligatorios',
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
      alt_client_email: certValues.alt_email || contactInfValue.email,
      alt_client_phone: contactInfValue.phone,
      alt_client_requested_by: contactInfValue.requested_by,
      alt_client_company_name: certValues.alt_company_name || null,
      alt_client_address: certValues.alt_address || null,
    }

    fetchData({
      url: 'quotes/request',
      method: 'POST',
      body: requestBody,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.dismiss()
        if (res.status === 200) {
          toast.success('Cotización creada con éxito', {
            description: 'En breve nos pondremos en contacto. ¡Gracias por preferirnos!',
          })
          resetState()
          return
        }
        toast.error('Ocurrió un error al enviar la solicitud', {
          description: res.message,
        })
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Ocurrió un error al enviar la solicitud', {
          description: 'Por favor, intente nuevamente',
        })
      })
  }

  const isInfoContactValid = () => {
    const { company_name, address, requested_by, phone, email } = contactInfValue
    return !!(company_name && address && requested_by && phone && email)
  }

  const isEquipmentValid = () => {
    const invalid = equipmentValue.filter(
      (item) =>
        item.name === '' ||
        item.count === '' ||
        item.model === '' ||
        item.type_service === '' ||
        item.measuring_range === '',
    )
    return invalid.length === 0
  }

  useEffect(() => {
    toast.loading('Cargando información...')
    fetchData({ url: 'configuration/all/authorized_services' })
      .then((res) => {
        if (res.success) setAuthorizedServices(res.data)
        else toast.error('Error al cargar los servicios autorizados', { description: res.details })
      })
      .catch(() => toast.error('Error al cargar la información'))
      .finally(() => toast.dismiss())

    fetchData({ url: 'clients' }).then((data) => {
      if (data.status === 200) setClients(data.data)
    })
  }, [])

  useEffect(() => {
    if (companySelected === -1) {
      return setContactInfValue({ ...initialContactInformationForm })
    }
    fetchData({ url: `clients/${companySelected}` }).then((data: any) => {
      if (data.status === 200) setContactInfValue(data.data)
      else setContactInfValue({} as any)
    })
  }, [companySelected])

  useEffect(() => {
    if (extractExcelData.length > 0) {
      setEquipmentValue(extractExcelData)
    }
  }, [extractExcelData])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Nueva Cotización</h1>
            <p className="text-sm text-gray-500 mt-0.5">Completa los datos para generar una nueva cotización de servicios</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* ── Main column ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* ── Section 1: Client data ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 text-sm font-bold">1</span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 text-sm">Información del Cliente</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Selecciona la empresa y verifica los datos de contacto</p>
                </div>
              </div>

              <div className="p-6">
                {/* Company selector — full width */}
                <div className="mb-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    Empresa <span className="text-red-500">*</span>
                  </label>
                  <PopoverSelected
                    list={
                      clients.length > 0
                        ? clients.map((c) => ({ id: c.id, name: c.company_name }))
                        : []
                    }
                    value={contactInfValue.company_name}
                    label=""
                    name="company_name"
                    onChange={handleInputChange}
                    setItemSelected={setCompanySelected}
                    placeholder="Escribe o selecciona la empresa..."
                  />
                </div>

                {/* Grid fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="c-input-wrapper">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      Solicitado por <span className="text-red-500">*</span>
                    </label>
                    <CInput
                      label=""
                      value={contactInfValue.requested_by}
                      name="requested_by"
                      onChange={handleInputChange}
                      required
                      placeholder="Nombre de quien solicita"
                    />
                  </div>

                  <div className="c-input-wrapper">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <CInput
                      label=""
                      value={contactInfValue.phone}
                      name="phone"
                      onChange={handleInputChange}
                      type="text"
                      required
                      placeholder="Número de teléfono"
                    />
                  </div>

                  <div className="c-input-wrapper">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <CInput
                      label=""
                      value={contactInfValue.email}
                      name="email"
                      onChange={handleInputChange}
                      type="email"
                      required
                      placeholder="Correo de contacto"
                    />
                  </div>

                  <div className="c-input-wrapper">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      Dirección
                    </label>
                    <CInput
                      label=""
                      value={contactInfValue.address}
                      name="address"
                      onChange={handleInputChange}
                      dissabled
                      placeholder="Se completa automáticamente"
                    />
                  </div>

                  <div className="c-input-wrapper">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                      <Hash className="w-3.5 h-3.5 text-gray-400" />
                      No. RUC
                    </label>
                    <CInput
                      label=""
                      value={contactInfValue.no_ruc}
                      name="no_ruc"
                      onChange={handleInputChange}
                      dissabled
                      placeholder="Se completa automáticamente"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 2: Certificate data (optional) ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setShowCertSection(!showCertSection)}
                className="w-full px-6 py-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-700 text-sm font-bold">2</span>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-gray-800 text-sm">Datos para Certificado</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${hasCertData ? 'bg-violet-100 text-violet-700' : 'bg-amber-50 text-amber-600'}`}>
                        {hasCertData ? 'Con datos alternativos' : 'Opcional'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Datos alternativos que aparecerán en el PDF del certificado</p>
                  </div>
                </div>
                <div className="text-gray-400 flex-shrink-0">
                  {showCertSection
                    ? <ChevronUp className="w-4 h-4" />
                    : <ChevronDown className="w-4 h-4" />
                  }
                </div>
              </button>

              {!showCertSection && (
                <div className="px-6 py-3 bg-violet-50/50 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <p className="text-xs text-violet-600">
                    Si no se completan, el certificado usará los datos del cliente seleccionado. Haz clic para expandir y configurar.
                  </p>
                </div>
              )}

              {showCertSection && (
                <div className="p-6">
                  <div className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-xl p-3.5 mb-5">
                    <Info className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-violet-700 leading-relaxed">
                      Estos campos son <strong>opcionales</strong>. Los campos que dejes vacíos usarán los datos del cliente por defecto en el PDF del certificado.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="c-input-wrapper">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        Empresa
                      </label>
                      <CInput
                        label=""
                        value={certValues.alt_company_name}
                        name="alt_company_name"
                        onChange={handleCertChange}
                        placeholder={contactInfValue.company_name || 'Empresa alternativa...'}
                      />
                    </div>

                    <div className="c-input-wrapper">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        Dirección
                      </label>
                      <CInput
                        label=""
                        value={certValues.alt_address}
                        name="alt_address"
                        onChange={handleCertChange}
                        placeholder={contactInfValue.address || 'Dirección alternativa...'}
                      />
                    </div>

                    <div className="c-input-wrapper">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        E-mail
                      </label>
                      <CInput
                        label=""
                        value={certValues.alt_email}
                        name="alt_email"
                        onChange={handleCertChange}
                        type="email"
                        placeholder={contactInfValue.email || 'Email alternativo...'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Section 3: Equipment ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 text-sm">Equipos a Cotizar</h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {equipmentValue.length === 0
                        ? 'Sin equipos agregados'
                        : `${equipmentValue.length} equipo${equipmentValue.length !== 1 ? 's' : ''} agregado${equipmentValue.length !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddEquipment}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors px-3 py-2 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar equipo
                </button>
              </div>

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
                    {equipmentValue.map((item: any, index: number) =>
                      renderTableTr({
                        key: index,
                        id: item.id,
                        deleteEquipment: handleRemoveEquipment,
                        onChange: () => {},
                        updateEquipmentValue,
                        state: item,
                        authorizedServices,
                      })
                    )}

                    {equipmentValue.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <Wrench className="w-10 h-10 mb-3 opacity-30" />
                        <p className="text-sm font-medium">Sin equipos agregados</p>
                        <p className="text-xs mt-1">Usa el botón de arriba o importa desde Excel</p>
                      </div>
                    )}

                    <div className="table__body__tr">
                      <div className="table__body__tr__td">
                        <button
                          className="table__body__tr__td__btn"
                          onClick={handleAddEquipment}
                        >
                          + Agregar un nuevo equipo
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="w-72 flex-shrink-0 flex flex-col gap-4 sticky top-6">

            {/* Excel import */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Importar Excel</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Carga equipos desde un archivo</p>
                </div>
              </div>
              <div className="p-5">
                <label
                  htmlFor="upload-file"
                  className="group flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-600">
                      Arrastra aquí o{' '}
                      <span className="text-blue-600 group-hover:underline">selecciona</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">.xlsx, .xls</p>
                  </div>
                </label>
                <input
                  type="file"
                  hidden
                  id="upload-file"
                  onChange={handleFileChange}
                  accept=".xlsx, .xls"
                />

                {file && (
                  <div className="mt-3 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
                    <File className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs text-blue-700 font-medium truncate flex-1">{file.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!file}
                  className="mt-3 w-full text-xs font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Extraer información
                </button>
              </div>
            </div>

            {/* Summary & submit */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-gray-800 text-sm">Resumen</h3>
              </div>
              <div className="p-5">
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Cliente</span>
                    <span className="text-xs font-semibold text-gray-800 truncate max-w-[120px]">
                      {contactInfValue.company_name || '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Equipos</span>
                    <span className="text-xs font-semibold text-gray-800">
                      {equipmentValue.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Datos certificado</span>
                    <span className={`text-xs font-semibold ${hasCertData ? 'text-violet-600' : 'text-gray-400'}`}>
                      {hasCertData ? 'Alternativos' : 'Por defecto'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Estado</span>
                    <span className="text-xs bg-amber-50 text-amber-600 font-semibold px-2 py-0.5 rounded-full">
                      Pendiente
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSubmitQuoteRequest}
                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Crear Cotización
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-2.5">
                    Se enviará una notificación al cliente
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
