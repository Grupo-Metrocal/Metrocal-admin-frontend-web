import './index.scss'
import { ICertificate_T_03 } from '../../interface/t-03'
import { renderValue } from '@/utils/renderTableValueToCertificate'

export const TableT_03 = ({
  certificate,
  id,
  method_name,
}: {
  certificate: ICertificate_T_03
  id: number
  method_name: string
}) => {
  return (
    <div className="table-t-03">
      <section className="table-t-03__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-t-03__equipment-information__content">
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
            <p>Fecha de siguiente calibración:</p>
            <span>{certificate.equipment_information.next_calibration_date}</span>
          </div>
          <div>
            <p>Equipo calibrado:</p>
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
            <p>Rango de medición:</p>
            <span>{certificate.equipment_information.measurement_range}</span>
          </div>
          <div>
            <p>Resolución:</p>
            <span>{certificate.equipment_information.resolution}</span>
          </div>
          <div>
            <p>Modelo:</p>
            <span>{certificate.equipment_information.model}</span>
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

      <section className="table-v-01__calibration-result">
        <h2>Tabla de resultados de calibración</h2>

        <table>
          <thead>
            <tr>
              <th>Indicación del Patrón</th>
              <th>Indicación del Instrumento</th>
              <th>Corrección</th>
              <th>Incertidumbre expandida K = 2</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.result.pattern_indication.map(
              (item: any, index: any) => (
                <tr key={index}>
                  <td>{renderValue(item)}</td>
                  <td>
                    {
                      renderValue(certificate.calibration_results.result.instrument_indication[index])
                    }
                  </td>
                  <td>
                    {renderValue(certificate.calibration_results.result.correction[index])}
                  </td>
                  <td>
                    {
                      renderValue(certificate.calibration_results.result.uncertainty[index])
                    }
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      {
        certificate.show_table_international_system_units && (
          <section className="table-v-01__calibration-result">
            <h2>Resultados en Unidad del Sistema Internacional de Unidades</h2>

            <table>
              <thead>
                <tr>
                  <th>Indicación del Patrón</th>
                  <th>Indicación del Instrumento</th>
                  <th>Corrección</th>
                  <th>Incertidumbre expandida K = 2</th>
                </tr>
              </thead>
              <tbody>
                {certificate.calibration_results.result_unid_system.pattern_indication.map(
                  (item: any, index: any) => (
                    <tr key={index}>
                      <td>{renderValue(item)}</td>
                      <td>
                        {
                          renderValue(certificate.calibration_results.result_unid_system.instrument_indication[index])
                        }
                      </td>
                      <td>
                        {renderValue(certificate.calibration_results.result_unid_system.correction[index])}
                      </td>
                      <td>
                        {
                          renderValue(certificate.calibration_results.result_unid_system.uncertainty[index])
                        }
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </section>
        )
      }

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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{certificate.environmental_conditions.temperature}</td>
                <td>{certificate.environmental_conditions.humidity}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="table-v-01__calibration-result">
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
