import './index.scss'
import { ICertificate_T_01 } from '../../interface/t-01'

export const TableT_01 = ({
  certificate,
}: {
  certificate: ICertificate_T_01
}) => {
  return (
    <div className="table-t-01">
      <section className="table-t-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-t-01__equipment-information__content">
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
            <span>{certificate.equipment_information.maker}</span>
          </div>
          <div>
            <p>No. Serie:</p>
            <span>{certificate.equipment_information.serial_number}</span>
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

      <section className="table-t-01__calibration-result">
        <h2>Tabla de resultados de calibración</h2>

        <table>
          <thead>
            <tr>
              <th>Temperatura de referencia</th>
              <th>Indicación del Termómetro</th>
              <th>Correción</th>
              <th>Incertidumbre expandida K = 2</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.result.temperatureReference.map(
              (item: any, index: any) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    {
                      certificate.calibration_results.result
                        .thermometerIndication[index]
                    }
                  </td>
                  <td>
                    {certificate.calibration_results.result.correction[index]}
                  </td>
                  <td>
                    {
                      certificate.calibration_results.result
                        .expandedUncertaintyK2[index]
                    }
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      <section className="table-t-01__result_unid_system">
        {certificate.show_table_international_system_units && (
          <>
            <h2>Resultados en Unidad del Sistema Internacional de Unidades</h2>

            <table>
              <thead>
                <tr>
                  <th>Temperatura de referencia</th>
                  <th>Indicación del Termómetro</th>
                  <th>Correción</th>
                  <th>Incertidumbre expandida K = 2</th>
                </tr>
              </thead>
              <tbody>
                {certificate.calibration_results.result_unid_system.temperatureReference.map(
                  (item: any, index: any) => (
                    <tr key={index}>
                      <td>{item}</td>
                      <td>
                        {
                          certificate.calibration_results.result_unid_system
                            .thermometerIndication[index]
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
                            .expandedUncertaintyK2[index]
                        }
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </>
        )}

        <section className="table-t-01__environmental-conditions">
          <h2>
            <span>
              Condiciones ambientales (Higrotermómetro
              {' ' + certificate.pattern})
            </span>
          </h2>

          <table>
            <thead>
              <tr>
                <th>Temperatura (°C)</th>
                <th>Humedad relativa (%)</th>
                {/* <th>Presión atmosférica (hPa)</th> */}
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

        <section className="table-t-01__observations">
          <h2>Observaciones</h2>

          <div>
            <p>Patron utilizado</p>
            <span>{certificate.description_pattern?.pattern}</span>
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