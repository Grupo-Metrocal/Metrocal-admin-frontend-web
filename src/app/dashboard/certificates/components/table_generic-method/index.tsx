import { ICertificate_Generic_Method } from '../../interface/generic-method'
import './index.scss'

export const TableGenericMethod = ({
  certificate,
}: {
  certificate: ICertificate_Generic_Method
}) => {
  return (
    <div className="table">
      <section className="table__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table__equipment-information__content">
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
            <p>Intervalo de escala:</p>
            <span>{certificate.equipment_information.scale_interval}</span>
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

      <section className="table__calibration-result">
        <h2>Tabla de resultados de la calibración en g</h2>
        <table>
          <thead>
            <tr>
              <th>Indicación del Patrón</th>
              <th>Indicación del Instrumento</th>
              <th>Corrección</th>
              <th>Repetibilidad</th>
              <th>Incertidumbre expandida K = 2</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.results.map((result, index) => (
              <tr key={index}>
                <td>{result.pattern_indication} </td>
                <td>{result.instrument_indication}</td>
                <td>{result.correction}</td>
                <td>{result.expanded_uncertainty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="table__environmental_conditions">
        <h2>Condiciones ambientales</h2>
        <div>
          <p>Temperatura:</p>
          <span>
            ( {certificate.environmental_conditions.temperature} {' ± '}{' '}
            {certificate.environmental_conditions.temperature2} ) °C
          </span>
        </div>
        <div>
          <p>Humedad:</p>
          <span>
            ( {certificate.environmental_conditions.humidity} {' ± '}{' '}
            {certificate.environmental_conditions.humidity2} ) %
          </span>
        </div>
      </section>

      <section className="table__observations">
        <h2>Observaciones</h2>

        <div>
          <p>Patrón utilizado:</p>
          <span>{certificate.description_pattern}</span>
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

    </div>
  )
}
