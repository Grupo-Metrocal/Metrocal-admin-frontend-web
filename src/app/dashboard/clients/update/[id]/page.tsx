'use client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
import { fetchData } from '@/utils/fetch'
import { LayoutPage } from '@/components/LayoutPage'

const getClient = async (id: string) => {
  const response = await fetchData({
    url: `clients/${id}`,
    method: 'GET',
  })

  return response
}

export interface IProps {
  params: {
    id: string
  }
}

export default function Page({ params }: IProps) {
  const { id } = params

  const { values, handleInputChange, setValues } = useForm({})

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!isInfoContactValid()) {
      toast.error('Porfavor llene todos los campos', {
        description: 'Los campos son obligatorios',
      })
      return
    }

    toast.loading('Actualizando...')

    const response = await fetchData({
      url: `clients/update/${id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: values,
    })

    toast.dismiss()
    if (response.status === 200) {
      toast.success('Cliente actualizado')
    } else {
      toast.error('Algo salio mal', {
        description: response.details,
      })
    }
  }

  const isInfoContactValid = () => {
    const { company_name, address, requested_by, no, phone, email, no_ruc } =
      values
    if (
      !company_name ||
      !address ||
      !requested_by ||
      // !no ||
      !phone ||
      !email
      // !no_ruc
    ) {
      return false
    }
    return true
  }

  useEffect(() => {
    toast.loading('Cargando información del cliente')
    getClient(id)
      .then((response) => {
        if (!response.success) {
          return toast.error('Error al cargar la información del cliente', {
            description: response.details,
          })
        }

        const { data } = response

        setValues({
          company_name: data.company_name,
          address: data.address,
          requested_by: data.requested_by,
          no: data.no,
          phone: data.phone,
          email: data.email,
          no_ruc: data.no_ruc,
        })

        return
      })
      .catch((error) => {
        toast.error('Algo salió mal', {
          description: error.message || error.details,
        })
      })
      .finally(() => {
        toast.dismiss()
      })
  }, [id])

  return (
    <LayoutPage title="Modificar información principal">
      <div className="w-full bg-white">
        <form
          className="flex justify-between gap-1 flex-wrap w-[700px] p-8 rounded-lg"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <section
            style={{
              width: '47%',
            }}
          >
            <CInput
              name="company_name"
              label="Nombre de la empresa"
              value={values.company_name}
              onChange={handleInputChange}
              id="company_name"
              type="text"
              required
            />

            <CInput
              name="address"
              label="Dirección"
              value={values.address}
              onChange={handleInputChange}
              id="address"
              type="text"
              required
              placeholder="Dirección de la empresa"
            />

            <CInput
              name="requested_by"
              label="Solicitado por"
              value={values.requested_by}
              onChange={handleInputChange}
              id="requested_by"
              type="text"
              required
              placeholder="Ej. Juan Pérez"
            />

            {/* <CInput
          name="no"
          label="No."
          value={values.no}
          onChange={handleInputChange}
          id="no"
          type="text"
        /> */}
          </section>
          <section
            style={{
              width: '47%',
            }}
          >
            <CInput
              name="phone"
              label="Teléfono"
              value={values.phone}
              onChange={handleInputChange}
              id="phone"
              type="string"
              required
              placeholder="12345678"
            />

            <CInput
              name="email"
              label="E-mail"
              value={values.email}
              onChange={handleInputChange}
              id="email"
              type="email"
              required
              placeholder="Correo electrónico de contacto"
            />

            <CInput
              name="no_ruc"
              label="No. RUC"
              value={values.no_ruc}
              onChange={handleInputChange}
              id="no_ruc"
              type="text"
              placeholder="No. RUC (opcional)"
            />
          </section>
          <CButton
            widht="full"
            type="submit"
            style={{
              marginTop: '1rem',
            }}
          >
            Guardar cambios
          </CButton>
        </form>
      </div>
    </LayoutPage>
  )
}
