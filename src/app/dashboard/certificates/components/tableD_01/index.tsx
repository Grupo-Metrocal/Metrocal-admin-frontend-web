import './index.scss'
import { ICertificate_D_01 } from '../../interface/d-01'
import { renderValue } from '@/utils/renderTableValueToCertificate'

export const TableD_01 = ({ certificate,
  id,
  method_name,
}: {
  certificate: ICertificate_D_01
  id: number
  method_name: string
}) => {

  return (
    <div className="table-d-01">
      <section className="table-d-01__equipment-information">
        <h2>Información del equipo</h2>

        <div className="table-d-01__equipment-information__content">
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
            <span>
              {certificate.equipment_information.calibration_date}
            </span>
          </div>
          <div>
            <p>Equipo calibrado:</p>
            <span>
              {certificate.equipment_information.object_calibrated}
            </span>
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
            <span>
              {certificate.equipment_information.measurement_range}
            </span>
          </div>
          <div>
            <p>Resolución:</p>
            <span>{certificate.equipment_information.resolution}</span>
          </div>
          <div>
            <p>Código:</p>
            <span>
              {certificate.equipment_information.code}
            </span>
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
            {certificate.calibrations.calibration_result.calibration_point.map(
              (calibrationPoint, index) => (
                <tr key={index}>
                  <td>{calibrationPoint}</td>
                  <td>
                    {renderValue(certificate.calibrations.calibration_result.nominal_value[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibrations.calibration_result.value[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibrations.calibration_result.current_reading[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibrations.calibration_result.deviation[index])}
                  </td>
                  <td>
                    {renderValue(certificate.calibrations.calibration_result.uncertainty[index])}
                  </td>
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
            {certificate.calibrations.calibration_result_outside.current_reading_outside.map(
              (nominalValue, index) => (
                <tr key={index}>
                  <td>
                    {
                      index % 2 === 0 ? 'Superior' : 'Inferior'
                    }
                  </td>
                  <td
                  >
                    {renderValue(certificate.calibrations.calibration_result_outside.nominal_value_outside[index])}
                  </td>
                  <td>
                    {renderValue(nominalValue)}
                  </td>
                  <td
                  >
                    {renderValue(certificate.calibrations.calibration_result_outside.deviation_outside[index])}
                  </td>
                </tr>
              )
            )}

          </tbody>
        </table>
      </section>
      <section className="table-d-01__measurement_faces">
        <h2>Caras de medición de interiores</h2>
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
            {
              certificate.calibrations.calibration_result_inside.current_reading_inside.map(
                (nominalValue, index) => (
                  <tr key={index}>
                    <td>
                      {
                        index % 2 === 0 ? 'Superior' : 'Inferior'
                      }
                    </td>
                    <td
                    >
                      {renderValue(certificate.calibrations.calibration_result_inside.nominal_value_inside[index])}
                    </td>
                    <td>
                      {renderValue(nominalValue)}
                    </td>
                    <td>
                      {renderValue(certificate.calibrations.calibration_result_inside.deviation_inside[index])}
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </section>
      <section className="table-d-01__environmental_conditions">
        <h2>Condiciones ambientales</h2>

        <div>
          <div>
            <p>Temperatura ambiente:</p>
            <span>
              {certificate.environmental_conditions.temperature} (°C)
            </span>
          </div>
          <div>
            <p>Humedad relativa:</p>
            <span>{certificate.environmental_conditions.humidity} (%)</span>
          </div>
        </div>
      </section>
      <section className="table-d-01__observations">
        <h2>Observaciones</h2>

        <div>
          <p>Patrón utilizado:</p>
          <span>{certificate.descriptionPattern.calibration_method_used.method}</span>
        </div>

        <div>
          <p>
            Este certificado{' '}
            {certificate.creditable
              ? 'es acreditado ✅'
              : 'no es acreditado'}
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
