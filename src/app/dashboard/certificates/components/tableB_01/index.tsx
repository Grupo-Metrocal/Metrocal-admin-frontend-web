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

  const totalRows = certificate?.calibration_results?.result_test?.reference_mass?.length || 0;

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
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">Masa de referencia</th>
              <th className="border py-2 px-4">Indicación del equipo</th>
              <th className="border py-2 px-4">Error</th>
              <th className="border py-2 px-4">Repetibilidad</th>
              <th className="border py-2 px-4">Excentricidad máxima</th>
              <th className="border py-2 px-4">Incertidumbre expandida k=2</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr className="text-center">
                <td className="border py-2 px-4">
                  {renderValue(certificate?.calibration_results?.result_test?.reference_mass[0])}
                </td>
                <td className="border py-2 px-4">
                  {renderValue(certificate.calibration_results.result_test.equipment_indication[0])}
                </td>
                <td className="border py-2 px-4">
                  {renderValue(certificate.calibration_results.result_test.error[0])}
                </td>
                {
                  <td className="border py-2 px-4">
                    {renderValue(certificate.calibration_results.result_test.error[0])}
                  </td>
                }
                {
                  <td className="border py-2 px-4">
                    {renderValue(certificate.calibration_results.result_test.repeatability[0])}
                  </td>
                }
                <td className="border py-2 px-4">
                  {renderValue(certificate.calibration_results.result_test.uncertainty[0])}
                </td>
              </tr>
            }
            {certificate?.calibration_results?.result_test?.reference_mass?.map(
              (_result, index) => (
                index > 0 && <tr key={index} className="text-center">
                  <td className="border py-2 px-4">
                    {renderValue(certificate?.calibration_results?.result_test?.reference_mass?.[index])}
                  </td>
                  <td className="border py-2 px-4">
                    {renderValue(certificate.calibration_results.result_test.equipment_indication[index])}
                  </td>
                  <td className="border py-2 px-4">
                    {renderValue(certificate.calibration_results.result_test.error[index])}
                  </td>
                  {index === 0 || index === 1 && (
                    <td className="border py-2 px-4" rowSpan={index === 1 ? totalRows : 0}>
                      {renderValue(certificate.calibration_results.result_test.repeatability[index])}
                    </td>
                  )}
                  {index === 0 || index === 1 && (
                    <td className="border py-2 px-4" rowSpan={index === 1 ? totalRows : 0}>
                      {renderValue(certificate.calibration_results.result_test.maximum_eccentricity[index])}
                    </td>
                  )}
                  <td className="border py-2 px-4">
                    {renderValue(certificate.calibration_results.result_test.uncertainty[index])}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section >
      <br />
      <br />
      {
        certificate.show_additional_table !== '' && (
          <section className="table-b-01__calibration-result">
            <h2>Tabla de resultados de la calibración</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border py-2 px-4">Masa de referencia</th>
                  <th className="border py-2 px-4">Indicación del equipo</th>
                  <th className="border py-2 px-4">Error</th>
                  <th className="border py-2 px-4">Repetibilidad</th>
                  <th className="border py-2 px-4">Excentricidad máxima</th>
                  <th className="border py-2 px-4">Incertidumbre expandida k=2</th>
                </tr>
              </thead>
              <tbody>
                {
                  <tr className="text-center">
                    <td className="border py-2 px-4">
                      {renderValue(certificate?.calibration_results.result_test_extra?.reference_mass[0])}
                    </td>
                    <td className="border py-2 px-4">
                      {renderValue(certificate.calibration_results.result_test_extra.equipment_indication[0])}
                    </td>
                    <td className="border py-2 px-4">
                      {renderValue(certificate.calibration_results.result_test_extra.error[0])}
                    </td>
                    {
                      <td className="border py-2 px-4">
                        {renderValue(certificate.calibration_results.result_test_extra.error[0])}
                      </td>
                    }
                    {
                      <td className="border py-2 px-4">
                        {renderValue(certificate.calibration_results.result_test_extra.repeatability[0])}
                      </td>
                    }
                    <td className="border py-2 px-4">
                      {renderValue(certificate.calibration_results.result_test_extra.uncertainty[0])}
                    </td>
                  </tr>
                }
                {certificate?.calibration_results?.result_test_extra?.reference_mass?.map(
                  (_result, index) => (
                    index > 0 && <tr key={index} className="text-center">
                      <td className="border py-2 px-4">
                        {renderValue(certificate?.calibration_results?.result_test_extra?.reference_mass?.[index])}
                      </td>
                      <td className="border py-2 px-4">
                        {renderValue(certificate.calibration_results.result_test_extra.equipment_indication[index])}
                      </td>
                      <td className="border py-2 px-4">
                        {renderValue(certificate.calibration_results.result_test_extra.error[index])}
                      </td>
                      {index === 0 || index === 1 && (
                        <td className="border py-2 px-4" rowSpan={index === 1 ? totalRows : 0}>
                          {renderValue(certificate.calibration_results.result_test_extra.repeatability[index])}
                        </td>
                      )}
                      {index === 0 || index === 1 && (
                        <td className="border py-2 px-4" rowSpan={index === 1 ? totalRows : 0}>
                          {renderValue(certificate.calibration_results.result_test_extra.maximum_eccentricity[index])}
                        </td>
                      )}
                      <td className="border py-2 px-4">
                        {renderValue(certificate.calibration_results.result_test_extra.uncertainty[index])}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        )
      }

      <section className="table-p-01__calibration-result">
        <br />
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
      </section >

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
