import { useForm } from '@/hooks/useForm'
import { fetchData } from '@/utils/fetch'
import { CInput } from '../CInput'
import { CButton } from '../CButton'
import { Modal } from '../Modal'
import { toast } from 'sonner'

interface Props {
  method_name: string
  method_id: number
  zone: string
  className?: string
}

export const ReportMethodActivity = ({
  method_name,
  method_id,
  zone,
  className,
}: Props) => {
  return (
    <div className={`text-right ${className}`}>
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
