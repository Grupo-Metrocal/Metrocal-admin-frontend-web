import './page.scss'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import ContactIformation from './contactInformation'

export default function Home() {
  return (
    <main className="main">
      <header>
        <div className="main-image">
          <Image src={metrocalLogo} alt="Metrocal" />
        </div>
        <div className="main-title">
          <h4>
            <span>METROLOGÍA CONSULTORES DE NICARAGUA, S.A</span>
            <span>RUC : J0310000169420</span>
            <span>SOLICITUD DE SERVICIOS</span>
          </h4>
        </div>
        <div className="main-code">
          <h5>
            código
            <span>NI-R02-MCPR-02</span>
          </h5>
        </div>
      </header>

      <section className="main-body">
        <ContactIformation />
      </section>
    </main>
  )
}
