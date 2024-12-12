import './index.scss'
import { ICertificate_M_01 } from '../../interface/m-01'
import { renderValue } from '@/utils/renderTableValueToCertificate'

export const TableM_01 = ({
  certificate,
  id,
  method_name,
}: {
  certificate: ICertificate_M_01
  id: number
  method_name: string
}) => {
  return (
    <div className="table-m-01">
      <section className="table-v-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-v-01__equipment-information__content">
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
            <p>Objeto de calibración:</p>
            <span>{certificate.equipment_information.device}</span>
          </div>
          <div>
            <p>Fabricante / Marca:</p>
            <span>{certificate.equipment_information.maker}</span>
          </div>
          <div>
            <p>No. Serie:</p>
            <span>{certificate.equipment_information.serial_number}</span>
          </div>
          <div>
            <p>Capacidad máxima:</p>
            <span>{certificate.equipment_information.maximum_capacity}</span>
          </div>
          <div>
            <p>Código de identificación:</p>
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

      <section className="table-v-01__calibration-result">
        <h2>Tabla de resultados de calibración</h2>

        <table>
          <thead>
            <tr>
              <th className='text-center'>Item</th>
              <th className='text-center'>Serie / Código</th>
              <th className='text-center' colSpan={2}>Valor Nominal</th>
              <th className='text-center' colSpan={5}>Valor convencional</th>
              <th className='text-center' colSpan={2}>Incertidumbre expandida K = 2</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.items.map(
              (item: any, index: any) => (
                <tr key={index}>
                  <td>{renderValue(item)}</td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.serieCode?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.nominal_value?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.nominal_units?.[index])
                    }
                  </td>
                  {/* ---------- */}
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.conventional_value?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.conventional_units?.[index])
                    }
                  </td>

                  <td>
                    {
                      renderValue(certificate?.calibration_results?.conventional_indication?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.conventional_value_2?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.conventional_units?.[index])
                    }
                  </td>
                  {/* ---------- */}
                  <td
                    className='flex justify-end mr-2'
                  >
                    {
                      renderValue(certificate?.calibration_results?.uncertainty_value?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.uncertainty_units?.[index])
                    }
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      <section className="table-v-01__result_unid_system">
        <section className="table-v-01__environmental-conditions">
          <h2>
            <span>
              Condiciones ambientales
            </span>
          </h2>

          <table>
            <thead>
              <tr>
                <th>Temperatura</th>
                <th>Humedad relativa</th>
                <th>Presión atmosférica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{certificate.environmental_conditions.temperature}</td>
                <td>{certificate.environmental_conditions.humidity}</td>
                <td>{certificate.environmental_conditions.presion}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="table-m-01__calibration-result">
          <h2>Descripción de patrones utilizados</h2>

          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Código</th>
                <th>Trazabilidad</th>
                <th>Próx. Calibr.</th>
              </tr>
            </thead>
            <tbody>
              {certificate.description_pattern.map(
                (item, index) => (
                  <tr key={index}>
                    <td>{renderValue(item.equipment)}</td>
                    <td>
                      {
                        renderValue(item.code)
                      }
                    </td>
                    <td>
                      {renderValue(item.traceability)}
                    </td>
                    <td>
                      {renderValue(item.next_calibration)}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </section>

        <section className="table-v-01__observations">
          <h2>Observaciones</h2>

          {/* <div>
            <p>Patron utilizado</p>
            <span>{certificate.description_pattern?.pattern}</span>
          </div> */}

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

