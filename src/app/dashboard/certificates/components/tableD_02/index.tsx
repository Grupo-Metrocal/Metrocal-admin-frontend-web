import { ICertificate_D_02 } from "../../interface/d-02"

export const TableD_02 = ({
  certificate,
}: {
  certificate: ICertificate_D_02
}) => {
  return (
    <div className="table-d-01">
      <section className="table-d-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-d-01__equipment-information__content">
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
        </div>
      </section>
      <section className="table-d-01__calibration-result">
        <h2>Tabla de resultados de calibración</h2>
        <table>
          <thead>
            <tr>
              <th>Valor nominal</th>
              <th>Longitud real</th>
              <th>Lectura actual</th>
              <th>Desviación</th>
              <th>Incertidumbre expandida</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.calibration_accuracy_tests.map(
              (calibrationPoint) => (
                <tr key={calibrationPoint.nominal_value}>
                  <td>{calibrationPoint.nominal_value}</td>
                  <td>{calibrationPoint.actual_length}</td>
                  <td>{calibrationPoint.current_reading}</td>
                  <td>{calibrationPoint.deviation}</td>
                  <td>{calibrationPoint.expanded_uncertainty}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>
      <section className="table-d-01__environmental_conditions">
        <h2>Condiciones ambientales</h2>

        <div>
          <div>
            <p>Temperatura ambiente:</p>
            <span>{certificate.environmental_conditions.temperature} (°C)</span>
          </div>
          <div>
            <p>Humedad relativa:</p>
            <span>{certificate.environmental_conditions.humidity} (%)</span>
          </div>
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
