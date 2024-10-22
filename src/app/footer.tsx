import './page.scss'
const NOTE_ITEMS = [
  '(1) Datos generales: En este campo se detallan los datos que son requeridos por el cliente para el certificado de calibración.',
  '(2) Observación adicional: En este campo se definen los puntos específicos de calibración requeridos por el cliente.',
  '(3) Método de calibración: En este se especifica el método de calibración requerido por el cliente.',
  '(4) Tipo de servicio: En este campo se define el tipo de servicio requerido por el cliente, por ejemplo; calibración, mantenimiento, etc...',
  '(5) Tabla del servicio: En esta tabla, se muestran todos los equipos solicitados por el cliente.',
]

type TFooterComponent = {
  requested_by?: string
  approved_by?: string
  approved_date?: string
}
export const FooterComponent = ({
  requested_by,
  approved_by,
  approved_date,
}: TFooterComponent) => {
  return (
    <footer>
      <div className="main-footer__signature">
        <div>
          <span className="font-medium">Solicitado por: </span>
          <span>
            {requested_by ? `__${requested_by}__` : '____________________'}
          </span>
        </div>

        <div className="main-footer__signature__review">
          <div>
            <span className="font-medium">Revisado y aprobado por: </span>
            <span>
              {' '}
              {approved_by ? `__${approved_by}__` : '____________________'}
            </span>
          </div>
          <br />
          <div>
            <span className="font-medium">Fecha de aprobación: </span>
            <span>
              {' '}
              {approved_date ? `__${approved_date}__` : '____________________'}
            </span>
          </div>
        </div>
      </div>

      <div className="main-footer__version">
        <h5>METROLOGÍA CONSULTORES DE NICARAGUA, S.A</h5>
      </div>

      <div className="main-footer__note">
        {NOTE_ITEMS.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>

      <div className="main-footer__contact">
        <span>Bello Horizonte VI etapa. Iglesia Pio X 350 m este, Managua</span>
        <span>
          Tel: (505) 22490-758{' '}
          <a
            href="https://grupometrocal.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#09f',
              fontWeight: 'bold',
            }}
          >
            grupometrocal.com
          </a>{' '}
          , info@metrocal.co.ni
        </span>
      </div>
    </footer>
  )
}
