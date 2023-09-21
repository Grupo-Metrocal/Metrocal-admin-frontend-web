'use client'
import { useEffect, useState } from 'react'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import { fetchData } from '@/utils/fetch'

export interface IClient {
  id: number
  company_name: string
  no: string
  phone: string
  address: string
  no_ruc: string
  email: string
  requested_by: string
  created_at: string
}

interface IContactInformationProps {
  onChange: (e: any) => void
  setItemSelected: (id: number) => void
}

export default function ContactInformation({
  onChange,
  setItemSelected,
}: IContactInformationProps): JSX.Element {
  const [clients, setClients] = useState<IClient[]>([])

  useEffect(() => {
    fetchData({
      url: 'clients',
    }).then((data) => setClients(data))

    return () => {}
  }, [])

  return (
    <div>
      <AutocompleteInput
        requiredLabel={true}
        list={
          Object.keys(clients).length > 0
            ? clients.map((client) => ({
                id: client.id,
                name: client.company_name,
              }))
            : []
        }
        label="Empresa"
        name="enterprise"
        onChange={onChange}
        setItemSelected={setItemSelected}
      />
    </div>
  )
}
