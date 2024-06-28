import { ICertificate_B_01 } from '../../interface/b-01'

export const TableB_01 = ({
  certificate,
}: {
  certificate: ICertificate_B_01
}) => {
  console.log(certificate)
  return (
    <div className="table-b-01">
      <section className="table-b-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-b-01__equipment-information__content">
          <div>
            <p>Equipo:</p>
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
            <p>Longitud:</p>
            <span>{certificate.equipment_information.length}</span>
          </div>
          <div>
            <p>Acreditado:</p>
            <span>{certificate.equipment_information.acredited}</span>
          </div>
        </div>
      </section>
      <section className="table-b-01__calibration-result">
        <h2>Tabla de resultados de la calibración en g</h2>
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
            {certificate.calibration_results.result_tests.map(
              (result, index) => (
                <tr key={index}>
                  <td>{result.reference_mass} </td>
                  <td>{result.equipment_indication}</td>
                  <td>{result.error}</td>
                  <td>{result.repeatability}</td>
                  <td>{result.maximum_eccentricity}</td>
                  <td>{result.expanded_uncertainty}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      <section className="table-b-01__calibration-result">
        <h2>Tabla de resultados de la calibración en lb</h2>
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
            {certificate.calibration_results.result_tests_lb.map(
              (result, index) => (
                <tr key={index}>
                  <td>{result.reference_mass} </td>
                  <td>{result.equipment_indication}</td>
                  <td>{result.error}</td>
                  <td>{result.repeatability}</td>
                  <td>{result.maximum_eccentricity}</td>
                  <td>{result.expanded_uncertainty}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      <section className="table-d-01__environmental_conditions">
        <h2>Condiciones ambientales</h2>
        <div>
          <p>Temperatura:</p>
          <span>{certificate.environmental_conditions.temperature}</span>
        </div>
        <div>
          <p>Humedad:</p>
          <span>{certificate.environmental_conditions.humidity}</span>
        </div>
        <div>
          <p>Presión</p>
          <span>{certificate.environmental_conditions.pressure}</span>
        </div>
      </section>
      <section className="table-d-01__used_patterns">
        <h2>Descripción de patrones utilizados</h2>
        <table>
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Código</th>
              <th>Certificado</th>
              <th>Trazabilidad</th>
              <th>Proxima calibración</th>
            </tr>
          </thead>

          <tbody>
            {certificate.used_patterns.pressure_pattern.map((pattern) => (
              <tr key={pattern.id}>
                <td>{pattern.equipment}</td>
                <td>{pattern.code}</td>
                <td>{pattern.certificate}</td>
                <td>{pattern.traceability}</td>
                <td>{pattern.next_calibration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="table-d-01__observations">
        <h2>Observaciones</h2>

        <div>
          <p>Patrón utilizado:</p>
          <span>{certificate.observations}</span>
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
