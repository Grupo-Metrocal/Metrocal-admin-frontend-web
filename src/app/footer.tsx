const NOTE_ITEMS = [
  'En este campo se detallan los datos que son requeridos gor el cliente para el certificado de calibración.',
  'En este campo se definen los puntos específicos de calibración requeridos por el cliente.',
  'En este se especifica el método de calibración requerido por el cliente.',
  'En este campo se define el tipo de servicio requerido por el cliente.',
  'La tabla anterior es modificable. se pueden anexar las celdas necesarias hasta completar los datos de los equioos a calibrar.',
]
export const FooterComponent = () => {
  return (
    <footer>
      <div className="main-footer__signature">
        <div>
          <span>Elaborado por: </span>
          <span>__________NE__________</span>
        </div>

        <div className="main-footer__signature__review">
          <div>
            <span>Revisado y aprobado por: </span>
            <span>______________________</span>
          </div>
          <br />
          <div>
            <span>Fecha de aprobación: </span>
            <span>______________________</span>
          </div>
        </div>
      </div>

      <div className="main-footer__version">
        <h5>versión 1 Aprobado en NI-MCPR-02 v7 con fecha 2019-10-18</h5>
        <h5>METROLOGÍA CONSULTORES DE NICARAGUA, S.A</h5>
      </div>

      <div className="main-footer__note">
        {NOTE_ITEMS.map((item, index) => (
          <span key={index}>
            <span className="italic">{`Nota(${index + 1}): `}</span> {item}
          </span>
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
