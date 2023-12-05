'use client'
import { useEffect, useState } from 'react'
import { AutocompleteInput } from '@/components/AutocompleteInput'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
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

interface IState {
  company_name: string
  address: string
  requested_by: string
  no: string
  phone: string
  email: string
  no_ruc: string
}

interface IContactInformationProps {
  onChange: (e: any) => void
  setItemSelected: (id: number) => void
  handleNextStep?: () => void
  state: IState
}

export default function ContactInformation({
  onChange,
  state,
  setItemSelected,
  handleNextStep,
}: IContactInformationProps) {
  const [clients, setClients] = useState<IClient[]>([])
  useEffect(() => {
    fetchData({
      url: 'clients',
    }).then((data) => {
      if (data.status === 200) {
        setClients(data.data)
      }
    })

    return () => {}
  }, [])

  return (
    <div className="contact-information">
      <h5>
        <span>
          Llene todos los campos obligatorio para la información de contacto
        </span>
        <span className="date">Fecha: {new Date().toLocaleDateString()}</span>
      </h5>

      <div className="contact-information__body">
        <section className="contact-information__body__section-left">
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
            value={state.company_name}
            label="Empresa"
            name="company_name"
            onChange={onChange}
            setItemSelected={setItemSelected}
            required={true}
            placeholder="Seleccione una empresa"
          />

          <CInput
            label="Solicitado por"
            value={state.requested_by}
            name="requested_by"
            onChange={onChange}
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
            value={state.phone}
            name="phone"
            onChange={onChange}
            type="number"
            required={true}
            placeholder="Teléfono de la empresa o persona que solicita el servicio"
          />
        </section>
        <section className="contact-information__body__section-right">
          <CInput
            label="E-mail"
            value={state.email}
            name="email"
            onChange={onChange}
            type="email"
            required={true}
            placeholder="Correo electrónico de contacto"
          />

          <CInput
            label="Dirección"
            value={state.address}
            name="address"
            onChange={onChange}
            required={true}
            placeholder="Dirección de la empresa"
          />

          <CInput
            label="No. RUC"
            value={state.no_ruc}
            name="no_ruc"
            onChange={onChange}
            required={true}
            placeholder="Número de RUC de la empresa"
          />

          <div className="contact-information__body__section-right__button">
            <CButton onClick={handleNextStep} uppercase={true}>
              Siguiente
            </CButton>
          </div>
        </section>
      </div>
    </div>
  )
}
