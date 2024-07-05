import './index.scss'
import { ICertificate_V_01 } from '../../interface/v-01'

export const TableV_01 = ({
  certificate,
  id,
  method_name,
}: {
  certificate: ICertificate_V_01
  id: number
  method_name: string
}) => {
  return (
    <div className="table-v-01">
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
            <p>Cap. nominal/alcance:</p>
            <span>{certificate.equipment_information.nominal_range}</span>
          </div>
          <div>
            <p>División de escala:</p>
            <span>{certificate.equipment_information.scale_division}</span>
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
              <th>Volumen Nominal</th>
              <th>Volumen Convencional</th>
              <th>Desviación</th>
              <th>Incertidumbre expandida K = 2</th>
            </tr>
          </thead>
          <tbody>
            {certificate.calibration_results.nominal_volume.map(
              (item: any, index: any) => (
                <tr key={index}>
                  <td>{renderValue(item)}</td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.conventional_volume?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.desviation?.[index])
                    }
                  </td>
                  <td>
                    {
                      renderValue(certificate?.calibration_results?.uncertainty?.[index])
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

function renderValue(value: any) {
  if (typeof value === 'object' && value !== null && '_error' in value) {
    return value._error || 'Error';
  }
  return value != null ? value.toString() : 'N/A';
}
