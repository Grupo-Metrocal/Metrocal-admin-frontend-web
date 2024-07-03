import { CButton } from "@/components/CButton"
import { useForm } from "@/hooks/useForm"
import { fetchData } from "@/utils/fetch"
import { toast } from "sonner"

export const ModifyQuote = ({ id }: { id: number }) => {

  const { values, handleInputChange } = useForm({
    message: ''
  })

  const handleSubmit = async () => {

    if (!values.message) {
      return toast.error('Debes mencionar los cambios que deseas realizar en la cotización.')
    }

    toast.loading('Enviando solicitud...')

    const response = await fetchData({
      url: 'quotes/request/modify',
      method: 'POST',
      body: {
        id: Number(id),
        message: values.message
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Solicitud enviada correctamente', {
        description: 'En breve nos pondremos en contacto contigo para confirmar los cambios solicitados.'
      })
    } else {
      toast.error(response.details)
    }
  }

  return (
    <div>
      <textarea name="message" id="message"
        className="w-full h-32 p-2 border border-gray-300 rounded-md"
        value={values.message}
        onChange={(e) => handleInputChange(e.target)}
      />

      <CButton className="mt-4"
        onClick={handleSubmit}
      >
        Enviar solicitud
      </CButton>
    </div>
  )
}