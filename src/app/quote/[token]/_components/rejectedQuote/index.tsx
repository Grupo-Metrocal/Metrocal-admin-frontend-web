import { useForm } from "@/hooks/useForm"
import { fetchData } from "@/utils/fetch"
import { useState } from "react"
import { toast } from "sonner"
import type { IQuote } from "@/app/dashboard/quotes/requests/[id]/page"
import { CButton } from "@/components/CButton"

export const CommentRejectedQuote = ({ quote }: { quote: IQuote }) => {
  const { values, handleInputChange } = useForm({ comment: '' })
  const [checkeds, setCheckeds] = useState<string[]>([])

  const handleChecked = (e: any) => {
    const value = e.target.value
    if (checkeds.includes(value)) {
      setCheckeds(checkeds.filter((item) => item !== value))
    } else {
      setCheckeds([...checkeds, value])
    }
  }

  const isButtonDisabled = () => {
    return checkeds.length === 0 && values.comment.trim() === ''
  }

  const handleRejectQuote = async () => {
    const commentRejected = `${values.comment} - ${checkeds.join(', ')}`

    toast.loading('Rechazando cotización...', {
      description: 'Espere un momento por favor',
    })

    quote.comment = values.comment
    quote.options = checkeds

    const response = await fetchData({
      url: 'quotes/request/approved-rejected/client',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id: quote?.id,
        comment: quote.comment,
        options: quote.options,
        status: 'rejected',
      },
    })

    toast.dismiss()

    if (response.success) {
      toast('La cotización fue rechazada', {
        description: 'Esperamos poder servirle en otra ocasión. 😊',
      })
    } else {
      toast.error('Error al rechazar la cotización', {
        description: response.details,
      })
    }
  }

  const OPTION_CHECKED = [
    'Precio muy alto',
    'Presupuesto limitado',
    'Cambios de circunstancia',
    'No se ajusta a sus necesidades',
    'Tiempo de entrega inadecuado',
    'Elementos adicionales no deseados',
    'Otro',
  ]

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
        {OPTION_CHECKED.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="w-4 h-4 "
              type="checkbox"
              name={item}
              id={item}
              value={item}
              onChange={handleChecked}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <textarea
          name="comment"
          id="comment"
          className="w-full h-24 border mt-2 mb-8 border-gray-300 rounded-md resize-none p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe un comentario"
          onChange={(e) => handleInputChange(e.target)}
        >
          {values.comment}
        </textarea>
      </div>

      <div className="flex justify-end gap-2">
        <CButton
          onClick={() => handleRejectQuote()}
          style={{
            backgroundColor: 'tomato',
          }}
          disabled={isButtonDisabled()}
        >
          No aprobar
        </CButton>
      </div>
    </div>
  )
}
