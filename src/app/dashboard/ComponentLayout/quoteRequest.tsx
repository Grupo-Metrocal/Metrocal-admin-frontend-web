'use client'

import { fetchData } from '@/utils/fetch'
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import { CButton } from '@/components/CButton'
import { Linking } from '@/utils/functions'

export const getClientsEmails = async () => {
  const response = await fetchData({
    url: 'clients/emails/all',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response
}

export type IClientEmail = {
  id: number
  company_name: string
  email: string
}
export const QuoteRequest = () => {
  const [clients, setClients] = useState<IClientEmail[]>([])
  const [selectedEmail, setSelectedEmail] = useState<string>('')

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

  const handleSendQuoteRequest = async () => {
    toast.loading('Enviando invitación...')
    const response = await fetchData({
      url: `users/invitation-user/${selectedEmail.split(',')[0]}`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()
    if (response.success) {
      toast.success('Invitación enviada')
    } else {
      toast.error('No se pudo enviar la invitación', {
        description: response.message || response.details,
      })
    }
  }

  return (
    <div className="quote-request">
      <AutocompleteInput
        label="Cliente"
        list={clients.map((client) => ({
          id: client.id,
          name: client.company_name,
        }))}
        onChange={(e) => {
          setSelectedEmail(
            clients.find((client) => client.company_name === e.value)?.email ||
            e.value,
          )
        }}
        keyList="clients"
        name="cliente"
        setItemSelected={(id) => {
          setSelectedEmail(
            clients.find((client) => client.id === id)?.email || '',
          )
        }}
      />

      <div className="flex justify-between mt-4 items-center">
        <CButton
          style={{
            boxShadow: 'none',
          }}
          onClick={handleSendQuoteRequest}
        >
          Solicitar cotización
        </CButton>

        <Linking href="/">Crear cotización</Linking>
      </div>
    </div>
  )
}
