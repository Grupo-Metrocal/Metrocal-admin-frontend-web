import { useForm } from '@/hooks/useForm'
import { fetchData } from '@/utils/fetch'
import { CInput } from '../CInput'
import { CButton } from '../CButton'
import { Modal } from '../Modal'
import { toast } from 'sonner'
import alert_icon from '@/assets/icons/alert_icon.svg'
import Image from 'next/image'

interface Props {
  method_name: string
  method_id: number
  zone: string
  className?: string
  report_messages?: string[]
  report_status?: boolean
}

export const ReportMethodActivity = ({
  method_name,
  method_id,
  zone,
  className,
  report_messages,
  report_status,
}: Props) => {
  return (
    <div className={`text-right flex justify-end gap-4 ${className}`}>
      <Modal
        title="Reportar anomalia de datos"
        nameButton="Reportar anomalia de datos"
        Component={() => (
          <Report method_name={method_name} method_id={method_id} zone={zone} />
        )}
        buttonStyle={{
          backgroundColor: 'tomato',
          fontWeight: '500',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.8em',
        }}
      />

      {report_status && (
        <Modal
          title="Reportes"
          Component={() => (
            <ReportList report_messages={report_messages || []} />
          )}
        >
          <Image src={alert_icon} alt="alert_icon" width={20} height={20} />
        </Modal>
      )}
    </div>
  )
}

export const Report = ({ method_name, method_id, zone }: Props) => {
  const { values, handleInputChange, reset } = useForm({
    report: '',
  })

  const handleReport = async () => {
    if (values.report === '') {
      toast.error('El reporte no puede estar vacío')
      return
    }

    toast.loading('Enviando reporte...')

    const response = await fetchData({
      url: `methods/emmit-report/${method_id}`,
      method: 'POST',
      body: {
        method_name: method_name.replaceAll('-', '_'),
        report: `${zone}: ${values.report}`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    reset()
    toast.dismiss()

    if (response.success) {
      toast.success('Has emitido un reporte en la zona ' + zone)
    } else {
      toast.error('No se ha podido emitir el reporte')
    }
  }

  return (
    <div>
      <CInput
        placeholder="Enviar un mensaje de reporte"
        value={values.report}
        name="report"
        onChange={handleInputChange}
        type="text"
      />

      <CButton
        onClick={handleReport}
        className="mt-4"
        style={{
          backgroundColor: 'tomato',
          fontWeight: '500',
        }}
      >
        Reportar anomalia en {zone}
      </CButton>
    </div>
  )
}

const ReportList = ({ report_messages }: { report_messages: string[] }) => {
  return (
    <div>
      {report_messages.map((message: string, index: number) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg mb-2"
        >
          <Image src={alert_icon} alt="alert_icon" width={20} height={20} />
          <p>{message}</p>
        </div>
      ))}
    </div>
  )
}
