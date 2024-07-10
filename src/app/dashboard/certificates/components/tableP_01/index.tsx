import './index.scss'
import { ICertificate_P_01 } from '../../interface/p-01'
import { TableCMC } from './_components/tableCMC'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useForm } from '@/hooks/useForm'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { toast } from 'sonner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'

export const TableP_01 = ({
  certificate,
  id,
  method_name,
}: {
  certificate: ICertificate_P_01
  id: number
  method_name: string
}) => {

  const { values, handleSelectChange } = useForm({
    option: certificate.optionsCMCOnCertificate
  })

  const handleChangeOptionsCMC = async (target: any) => {
    toast.loading('Cambiando visualización...')

    const response = await fetchData({
      url: 'methods/options-cmc-on-certificate',
      method: 'POST',
      body: {
        optionsCMCOnCertificate: target.target.value,
        method_id: id,
        method_name: method_name.replaceAll('-', '_'),
      },
      headers: {
        'Content-Type': 'application/json',
        Autorization: `Bearer ${getCookie('token')}`,
      }
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Se ha cambiado la visualización de la tabla de resultados')
      handleSelectChange(target)
    } else {
      toast.error('Ha ocurrido un error', {
        description: 'Si el error persiste, contacta con el administrador',
      })
    }
  }

  return (
    <div className="table-p-01">
      <section className="table-p-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-p-01__equipment-information__content">
          <div>
            <p>Código de servicio:</p>
            <span>{certificate.equipment_information.service_code}</span>
          </div>
          <div>
            <p>Fecha de emisión del certificado:</p>
            <span>
              {certificate.equipment_information.certificate_issue_date}
            </span>
          </div>
          <div>
            <p>Fecha de calibración:</p>
            <span>{certificate.equipment_information.calibration_date}</span>
          </div>
          <div>
            <p>Equipo calibrado:</p>
            <span>{certificate.equipment_information.object_calibrated}</span>
          </div>
          <div>
            <p>Fabricante / Marca:</p>
            <span>{certificate.equipment_information.manufacturer}</span>
          </div>
          <div>
            <p>No. Serie:</p>
            <span>{certificate.equipment_information.no_series}</span>
          </div>
          <div>
            <p>Modelo:</p>
            <span>{certificate.equipment_information.model}</span>
          </div>
          <div>
            <p>Rango de medición:</p>
            <span>{certificate.equipment_information.measurement_range}</span>
          </div>
          <div>
            <p>Resolución:</p>
            <span>{certificate.equipment_information.resolution}</span>
          </div>
          <div>
            <p>Código:</p>
            <span>{certificate.equipment_information.code}</span>
          </div>
          <div>
            <p>Solicitante:</p>
            <span>{certificate.equipment_information.applicant}</span>
          </div>
          <div>
            <p>Dirección del solicitante:</p>
            <span>{certificate.equipment_information.address}</span>
          </div>
          <div>
            <p>Ubicación de calibración:</p>
            <span>
              {certificate.equipment_information.calibration_location}
            </span>
          </div>
        </div>
      </section>

      <section className="table-p-01__calibration-result">

        <div className='flex justify-between'>
          <h2>Tabla de resultados de calibración</h2>

          <Popover>
            <PopoverTrigger>
              <span className='text-[#09f]'>Mostrar tabla de la CMC</span>
            </PopoverTrigger>
            <PopoverContent
              className='w-[600px] bg-white'
            >
              <TableCMC cmc={certificate.CMC} />
            </PopoverContent>
          </Popover>
        </div>

        <div className='m-5 flex flex-col gap-4'>
          <span>
            Visualización de la tabla de resultados
          </span>
          <AlertDialogModal
            useCheckbox={true}
            onConfirm={() => {
              handleChangeOptionsCMC(
                {
                  target: {
                    value: values.option === 'change_values' ? 'asterisks' : 'change_values',
                    name: 'option'
                  }
                }
              )
            }}
            nameCheckbox={values.option}
            checked={values.option === 'asterisks' ? true : false}
            label="Usar asteriscos"
            title="
            ¿Estás seguro de querer cambiar la visualización de la tabla de resultados?"
          />

          <AlertDialogModal
            useCheckbox={true}
            onConfirm={() => {
              handleChangeOptionsCMC(
                {
                  target: {
                    value: values.option === 'asterisks' ? 'change_values' : 'asterisks',
                    name: 'option'
                  }
                }
              )
            }}
            nameCheckbox={values.option}
            checked={values.option === 'change_values' ? true : false}
            label="Cambiar resultados por valores de CMC"
            title="
            ¿Estás seguro de querer cambiar la visualización de la tabla de resultados?"
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Presión de referencia</th>
              <th>indicación del equipo</th>
              <th>Correción</th>
              <th>Incertidumbre expandida K = 2</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.result.reference_pressure.map(
              (item: any, index: any) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    {
                      certificate.calibration_results.result
                        .equipment_indication[index]
                    }
                  </td>
                  <td>
                    {certificate.calibration_results.result.correction[index]}
                  </td>
                  <td>
                    {certificate.calibration_results.result.uncertainty[index]}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      <section className="table-p-01__result_unid_system">
        <h2>Resultados en Unidad del Sistema Internacional de Unidades</h2>

        <table>
          <thead>
            <tr>
              <th>Presión de referencia</th>
              <th>indicación del equipo</th>
              <th>Correción</th>
              <th>Incertidumbre expandida K = 2</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.result_unid_system.reference_pressure.map(
              (item: any, index: any) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    {
                      certificate.calibration_results.result_unid_system
                        .equipment_indication[index]
                    }
                  </td>
                  <td>
                    {
                      certificate.calibration_results.result_unid_system
                        .correction[index]
                    }
                  </td>
                  <td>
                    {
                      certificate.calibration_results.result_unid_system
                        .uncertainty[index]
                    }
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>



        <section className="table-p-01__environmental-conditions">
          <h2>Condiciones ambientales</h2>

          <table>
            <thead>
              <tr>
                <th>Temperatura (°C)</th>
                <th>Humedad relativa (%)</th>
                <th>Presión atmosférica (hPa)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{certificate.environmental_conditions.temperature}</td>
                <td>{certificate.environmental_conditions.humidity}</td>
                <td>
                  {certificate.environmental_conditions.atmospheric_pressure}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="table-p-01__observations">
          <h2>Observaciones</h2>

          <div>
            <p>Patron utilizado</p>
            <span>{certificate.descriptionPattern?.pattern}</span>
          </div>

          <div>
            <p>
              Este certificado{' '}
              {certificate.creditable ? 'es acreditado ✅' : 'no es acreditado'}
            </p>
          </div>

          <div>
            <p>Observaciones adicionales</p>
            <span>{certificate.observations}</span>
          </div>
        </section>
      </section>
    </div>
  )
}
