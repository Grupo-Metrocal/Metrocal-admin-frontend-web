import { AlertDialogModal } from "@/components/AlertDialogModal"
import { CButton } from "@/components/CButton"
import { useForm } from "@/hooks/useForm"
import { fetchData } from "@/utils/fetch"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface IProps {
  calibration_method: string
  equipment_id: number
  current_certficate_code: string
}

const getAlternativeRecordIndex = async (toMethodName: string) => {
  return await fetchData({
    url: `methods/get-alternative-certification-code/${toMethodName}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

const updateRecordByAlternativeIndex = async (fromMethodName: string, toMethodName: string, equipmentId: number) => {
  return await fetchData({
    url: `methods/update-certification-code/${fromMethodName}/${toMethodName}/${equipmentId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
}

export const ChangeCertCode = ({ calibration_method, equipment_id, current_certficate_code }: IProps) => {
  const { values, handleSelectChange } = useForm({
    fromMethodName: ''
  })
  const [newCertCode, setNewCertCode] = useState('')

  const handleOnConfirm = async () => {

    if (!newCertCode) return toast('Porfavor extrae el codigo de un metodo')

    toast.loading('Reemplazando codigo...')

    const response = await updateRecordByAlternativeIndex(values.fromMethodName, calibration_method.replaceAll('-', '_'), equipment_id)
    toast.dismiss()

    if (response.success) {
      toast.success('Codigo reemplazado porfavor recargue la pagina')
    } else {
      toast.error('Error al reemplazar el codigo del certificado')
    }
  }

  useEffect(() => {

    if (values.fromMethodName) {
      toast.loading('Extrayendo codigo de certificado...')
      getAlternativeRecordIndex(values.fromMethodName.replaceAll('-', '_'))
        .then((response) => {
          toast.dismiss()

          if (response.success) {
            toast.success('Certificado extraido correctamente')
            setNewCertCode(response.data.certificate_code)
          } else {
            toast.error('Registros no encontrados')
            setNewCertCode('')
          }
        })
    }

  }, [values.fromMethodName])

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h3>Codigo actual del certificado:  <span className="font-semibold">{current_certficate_code}</span></h3>
      </header>

      <div>
        <div className="flex flex-col gap-[1em]">
          <label htmlFor="fromMethodName" className="font-semibold ">
            Extraer certificado de
          </label>
          <select
            name="fromMethodName"
            id="fromMethodName"
            defaultValue={values.fromMethodName}
            value={values.fromMethodName}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-md p-2 h-fit"
          >
            <option value="" selected disabled>Seleccione un metodo</option>
            <option value="NI_MCIT_P_01">NI-MCIT-P-01</option>
            <option value="NI_MCIT_B_01">NI-MCIT-B-01</option>
            <option value="NI_MCIT_T_01">NI-MCIT-T-01</option>
            <option value="NI_MCIT_T_03">NI-MCIT-T-03</option>
            <option value="NI_MCIT_T_05">NI-MCIT-T-05</option>
            <option value="NI_MCIT_V_01">NI-MCIT-V-01</option>
            <option value="NI_MCIT_D_01">NI-MCIT-D-01</option>
            <option value="NI_MCIT_D_02">NI-MCIT-D-02</option>
            <option value="NI_MCIT_M_01">NI-MCIT-M-01</option>
          </select>
        </div>

        <div>
          <h3>Codigo extraido: <span className="font-semibold">{newCertCode}</span></h3>
        </div>
      </div>

      <AlertDialogModal
        useButton
        title="Reemplazar codigo de certificado por el extraido?"
        description="Al aceptar se reemplazara el codigo anterior por el extraido"
        onConfirm={handleOnConfirm}
        nameButton="Reemplazar codigo"
      />
    </div>
  )
}