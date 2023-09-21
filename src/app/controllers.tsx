import DBLineIcon from '@/assets/icons/doble-line.svg'
import Image from 'next/image'

const CONTROLLERS_ITEMS = [
  {
    id: 1,
    name: 'Información de contacto',
  },
  {
    id: 2,
    name: 'Registro de equipos',
  },
]

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
      {CONTROLLERS_ITEMS.map((item, index) => (
        <>
          <button
            key={item.id}
            className={`main-controllers-button ${
              stepCounter === item.id && 'active'
            }`}
            onClick={() => handleCurrentStep(item.id)}
          >
            <span>{item.name}</span>
          </button>

          {index % 1 === 0 && index !== CONTROLLERS_ITEMS.length - 1 && (
            <Image src={DBLineIcon} alt="DBLineIcon" />
          )}
        </>
      ))}
    </section>
  )
}
