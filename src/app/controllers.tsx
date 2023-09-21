import DBLineIcon from '@/assets/icons/doble-line.svg'
import Image from 'next/image'

interface IControllersProps {
  stepCounter: number
  setStepCounter: (step: number) => void
}

export const Controllers = ({
  stepCounter,
  setStepCounter,
}: IControllersProps) => {
  const handleCurrentStep = (step: number) => setStepCounter(step)

  return (
    <section className="main-controllers">
      <div>
        <button
          className={`main-controllers-button ${stepCounter === 1 && 'active'}`}
          onClick={() => handleCurrentStep(1)}
        >
          <span>Información de contacto</span>
        </button>
      </div>

      <Image src={DBLineIcon} alt="DBLineIcon" />

      <div>
        <button
          className={`main-controllers-button ${stepCounter === 2 && 'active'}`}
          onClick={() => handleCurrentStep(2)}
        >
          <span>Registro de equipos</span>
        </button>
      </div>
    </section>
  )
}
