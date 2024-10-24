import './index.scss'
import { ICertificate_B_01 } from '../../interface/b-01'
import { renderValue } from '@/utils/renderTableValueToCertificate'

export const TableB_01 = ({
  certificate,
  id,
  method_name,
}: {
  certificate: ICertificate_B_01
  id: number
  method_name: string
}) => {
  return (
    <div className="table-b-01">
      <section className="table-b-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-b-01__equipment-information__content">
          <div>
            <p>Código de servicio:</p>
            <span>
              {certificate.equipment_information.service_code || '---'}
            </span>
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
            <span>{certificate.equipment_information.identification_code}</span>
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
      <section className="table-b-01__calibration-result">
        <h2>Tabla de resultados de la calibración</h2>
        <table>
          <thead>
            <tr>
              <th>Masa de referencia</th>
              <th>Indicación del equipo</th>
              <th>Error</th>
              <th>Repetibilidad</th>
              <th>Excentricidad maxima</th>
              <th>Incertidumbre expandida</th>
            </tr>
          </thead>
          <tbody>
            {certificate?.calibration_results?.result_test?.reference_mass?.map(
              (result, index) => (
                <tr key={index}>
                  <td>{renderValue(result)} </td>
                  <td>
                    {renderValue(certificate.calibration_results.result_test.equipment_indication[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibration_results.result_test.error[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibration_results.result_test.repeatability[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibration_results.result_test.maximum_eccentricity[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibration_results.result_test.uncertainty[index])}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      {certificate.show_additional_table !== '' && (
        <section className="table-b-01__calibration-result">
          <h2>Tabla de resultados de la calibración</h2>
          <table>
            <thead>
              <tr>
                <th>Masa de referencia</th>
                <th>Indicación del equipo</th>
                <th>Error</th>
                <th>Repetibilidad</th>
                <th>Excentricidad maxima</th>
                <th>Incertidumbre expandida</th>
              </tr>
            </thead>
            <tbody>
              {certificate?.calibration_results?.result_test_extra?.reference_mass?.map(
                (item, index) => (
                  <tr key={index}>
                    <td>{renderValue(item)}</td>
                    <td>{renderValue(certificate.calibration_results.result_test_extra.equipment_indication[index])}</td>
                    <td>{renderValue(certificate.calibration_results.result_test_extra.error[index])}</td>
                    <td>{renderValue(certificate.calibration_results.result_test_extra.repeatability[index])}</td>
                    <td>{renderValue(certificate.calibration_results.result_test_extra.maximum_eccentricity[index])}</td>
                    <td>{renderValue(certificate.calibration_results.result_test_extra.uncertainty[index])}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </section>
      )
      }

      <section className="table-b-01__environmental-conditions">
        <h2>Condiciones ambientales</h2>

        <table>
          <thead>
            <tr>
              <th>Temperatura (°C)</th>
              <th>Humedad relativa (%)</th>
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

      <section className="table-p-01__calibration-result">
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

      <section className="table-b-01__observations">
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
    </div >
  )
}
