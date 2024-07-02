import './index.scss'
import { ICertificate_D_01 } from '../../interface/d-01'

export const TableD_01 = ({ certificate }: { certificate: any }) => {
  const certificateData: ICertificate_D_01 = certificate.certificate

  return (
    <div className="table-d-01">
      <section className="table-d-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-d-01__equipment-information__content">
          <div>
            <p>Código de servicio:</p>
            <span>
              {certificateData.equipment_information.service_code || '---'}
            </span>
          </div>
          <div>
            <p>Fecha de emisión del certificado:</p>
            <span>
              {certificateData.equipment_information.certificate_issue_date}
            </span>
          </div>
          <div>
            <p>Fecha de calibración:</p>
            <span>
              {certificateData.equipment_information.calibration_date}
            </span>
          </div>
          <div>
            <p>Equipo calibrado:</p>
            <span>
              {certificateData.equipment_information.object_calibrated}
            </span>
          </div>
          <div>
            <p>Fabricante / Marca:</p>
            <span>{certificateData.equipment_information.maker}</span>
          </div>
          <div>
            <p>No. Serie:</p>
            <span>{certificateData.equipment_information.serial_number}</span>
          </div>
          <div>
            <p>Modelo:</p>
            <span>{certificateData.equipment_information.model}</span>
          </div>
          <div>
            <p>Rango de medición:</p>
            <span>
              {certificateData.equipment_information.measurement_range}
            </span>
          </div>
          <div>
            <p>Resolución:</p>
            <span>{certificateData.equipment_information.resolution}</span>
          </div>
          <div>
            <p>Código:</p>
            <span>
              {certificateData.equipment_information.identification_code}
            </span>
          </div>
          <div>
            <p>Solicitante:</p>
            <span>{certificateData.equipment_information.applicant}</span>
          </div>
          <div>
            <p>Dirección del solicitante:</p>
            <span>{certificateData.equipment_information.address}</span>
          </div>
          <div>
            <p>Ubicación de calibración:</p>
            <span>
              {certificateData.equipment_information.calibration_location}
            </span>
          </div>
        </div>
      </section>
      <section className="table-d-01__calibration-result">
        <h2>Tabla de resultados de calibración</h2>
        <table>
          <thead>
            <tr>
              <th>Punto de calibración</th>
              <th>Valor nominal</th>
              <th>Valor real</th>
              <th>Lectura actual</th>
              <th>Desviación</th>
              <th>Incertidumbre expandida</th>
            </tr>
          </thead>
          <tbody>
            {certificateData.calibration_results.calibration_points.map(
              (calibrationPoint) => (
                <tr key={calibrationPoint.C}>
                  <td>{calibrationPoint.C}</td>
                  <td>{calibrationPoint.G}</td>
                  <td>{calibrationPoint.K}</td>
                  <td>{calibrationPoint.O}</td>
                  <td>{calibrationPoint.S}</td>
                  <td>{calibrationPoint.W}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>
      <section className="table-d-01__measurement_faces">
        <h2>Caras de medición de exteriores</h2>
        <table>
          <thead>
            <tr>
              <th>Punto</th>
              <th>Valor nominal</th>
              <th>Lectura actual</th>
              <th>Desviación</th>
            </tr>
          </thead>
          <tbody>
            {certificateData.calibration_results.exterior_measurement_faces.map(
              (measurementFace, index) => (
                <tr key={index}>
                  <td>{measurementFace.position ? 'Superior' : 'Inferior'}</td>
                  <td>{measurementFace.E || ''}</td>
                  <td>{measurementFace.H || ''}</td>
                  <td>{measurementFace.L || ''}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>
      <section className="table-d-01__measurement_faces">
        <h2>Caras de medición de exteriores</h2>
        <table>
          <thead>
            <tr>
              <th>Punto</th>
              <th>Valor nominal</th>
              <th>Lectura actual</th>
              <th>Desviación</th>
            </tr>
          </thead>
          <tbody>
            {certificateData.calibration_results.interior_measurement_faces.map(
              (measurementFace, index) => (
                <tr key={index}>
                  <td>{measurementFace.position ? 'Superior' : 'Inferior'}</td>
                  <td>{measurementFace.T || ''}</td>
                  <td>{measurementFace.W || ''}</td>
                  <td>{measurementFace.Z || ''}</td>
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
            <span>
              {certificateData.environmental_conditions.temperature} (°C)
            </span>
          </div>
          <div>
            <p>Humedad relativa:</p>
            <span>{certificateData.environmental_conditions.humidity} (%)</span>
          </div>
        </div>
      </section>
      <section className="table-d-01__observations">
        <h2>Observaciones</h2>

        <div>
          <p>Patrón utilizado:</p>
          <span>{certificateData.description_pattern.join(', ')}</span>
        </div>

        <div>
          <p>
            Este certificado{' '}
            {certificateData.creditable
              ? 'es acreditado ✅'
              : 'no es acreditado'}
          </p>
        </div>

        <div>
          <p>Observaciones adicionales</p>
          <span>{certificateData.observations}</span>
        </div>
      </section>
    </div>
  )
}
