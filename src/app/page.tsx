'use client'
import './page.scss'
import { useEffect, useState } from 'react'
import { useForm } from '@/hooks/useForm'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import ContactInformation from './contactInformation'
import RegisterEquipment from './registerEquipment'
import { Controllers } from './controllers'

export default function Home() {
  const initialForm = {
    enterprise: '',
  }
  const [companySelected, setCompanySelected] = useState(-1)
  const { values, handleInputChange } = useForm(initialForm)
  const [stepCounter, setStepCounter] = useState(1)

  const handleSubmitQuoteRequest = (e: any) => {
    e.preventDefault()
    console.log(values)
  }

  useEffect(() => {
    console.log('companySelected', companySelected)
  }, [companySelected])

  const RenderStep = () => {
    switch (stepCounter) {
      case 1:
        return (
          <ContactInformation
            onChange={handleInputChange}
            setItemSelected={setCompanySelected}
          />
        )
      case 2:
        return <RegisterEquipment />
    }
  }

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

        <span>
          Si ya has solicitado una cotización en Metrocal tus datos fueron
          guardados
        </span>
      </header>

      <section className="main-controllers">
        <Controllers
          stepCounter={stepCounter}
          setStepCounter={setStepCounter}
        />
      </section>

      <section className="main-body">{RenderStep()}</section>

      <button className="main-submit" onClick={handleSubmitQuoteRequest}>
        <span>Enviar</span>
      </button>
    </main>
  )
}
