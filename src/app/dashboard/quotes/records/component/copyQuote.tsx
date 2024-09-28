import { useState, useEffect } from "react"
import { getClientsEmails, IClientEmail } from "@/app/dashboard/ComponentLayout/quoteRequest"
import { toast } from "sonner"
import { AutocompleteInput } from "@/components/AutocompleteInput"
import { CButton } from "@/components/CButton"
import { fetchData } from "@/utils/fetch"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

interface IProps {
  quoteId: number
}


export const CopyQuote = ({ quoteId }: IProps) => {
  const [clients, setClients] = useState<IClientEmail[]>([])
  const [selectedClientId, setSelectedClientId] = useState<number>()

  const router = useRouter()

  useEffect(() => {
    toast.loading('Cargando clientes...')
    getClientsEmails()
      .then((res) => {
        if (res.success) {
          setClients(res.data)
        } else {
          toast.error('No se pudo cargar los clientes', {
            description: res.message || res.details,
          })
        }
      })
      .finally(() => {
        toast.dismiss()
      })
  }, [])

  const handleCopyQuote = async () => {
    toast.loading('Copiando cotización...')
    const response = await fetchData({
      url: `quotes/copy/${quoteId}/${selectedClientId}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()
    if (response.success) {
      toast.success('Cotización copiada')
      router.push(`/dashboard/quotes/requests/${response.data.id}?increase=false`)
    } else {
      toast.error('Hubo un error al intentar copiar la cotización', {
        description: response.message || response.details,
      })
    }
  }

  return (
    <div>
      <AutocompleteInput
        label="Filtrar cliente"
        list={clients.map((client) => ({
          id: client.id,
          name: client.company_name,
        }))}
        onChange={(e) => {
          setSelectedClientId(
            clients.find((client) => client.company_name === e.value)?.id ||
            -1,
          )
        }}
        keyList="clients"
        name="cliente"
      />

      <div className="flex justify-between mt-4 items-center">
        <CButton
          onClick={handleCopyQuote}
        >
          Copiar Cotización
        </CButton>

      </div>
    </div>
  )
}