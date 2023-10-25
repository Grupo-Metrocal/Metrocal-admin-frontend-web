'use client'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import { CButton } from '@/components/CButton'
import { fetchData } from '@/utils/fetch'
import { toast } from 'sonner'

interface IProps {
  reload?: () => void
}

export default function ClientRegister({ reload }: IProps) {
  const initialContactInformationForm = {
    company_name: '',
    address: '',
    requested_by: '',
    no: '',
    phone: '',
    email: '',
    no_ruc: '',
  }
  const { values, handleInputChange } = useForm(initialContactInformationForm)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!isInfoContactValid()) {
      toast.error('Porfavor llene todos los campos', {
        description: 'Los campos son obligatorios',
      })
      return
    }

    toast.loading('Registrando cliente...')

    const response = await fetchData({
      url: 'clients',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: values,
    })

    if (response.status === 200) {
      toast.success('Cliente registrado con éxito', {
        description: 'Porfavor recargue la página para ver los cambios',
      })

      reload && reload()
    } else {
      toast.error('Ops! Ocurrió un error al registrar el cliente', {
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

  return (
    <form
      className="flex justify-between gap-1 w-full flex-wrap"
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
        />

        <CInput
          name="address"
          label="Dirección"
          value={values.address}
          onChange={handleInputChange}
          id="address"
          type="text"
        />

        <CInput
          name="requested_by"
          label="Solicitado por"
          value={values.requested_by}
          onChange={handleInputChange}
          id="requested_by"
          type="text"
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
          type="number"
        />

        <CInput
          name="email"
          label="E-mail"
          value={values.email}
          onChange={handleInputChange}
          id="email"
          type="email"
        />

        <CInput
          name="no_ruc"
          label="No. RUC"
          value={values.no_ruc}
          onChange={handleInputChange}
          id="no_ruc"
          type="text"
        />
      </section>
      <CButton
        widht="full"
        type="submit"
        style={{
          marginTop: '1rem',
        }}
      >
        Registrar mi información
      </CButton>
    </form>
  )
}
