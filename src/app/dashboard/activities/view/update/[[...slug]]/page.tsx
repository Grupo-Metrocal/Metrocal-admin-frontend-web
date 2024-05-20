import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { P_01 } from '../methods/p_01'
import { T_03 } from '../methods/t_03'
import { fetchData } from '@/utils/fetch'

const getEquipment = async (id: string, calibration_method: string) => {
  try {
    const response = await fetchData({
      url: `methods/${calibration_method.toLowerCase()}/equipment/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

export interface IRoot {
  params: {
    slug: string[]
  }
}

const RENDERER_METHOD = {
  'NI-MCIT-P-01': P_01,
  'NI-MCIT-T-03': T_03,
}
export default async function Page({ params }: IRoot) {
  const { slug } = params
  const id = slug[0]
  const calibration_method = slug[1]
  const activity_id = slug[2]

  const Renderer =
    RENDERER_METHOD[calibration_method as keyof typeof RENDERER_METHOD]

  const equipment = await getEquipment(id, calibration_method)

  return (
    <LayoutPage
      title={`Modificación de resultados en equipo ${calibration_method}`}
      rollBack
    >
      {Renderer ? (
        equipment.data ? (
          <Renderer equipment={equipment.data} activity_id={activity_id} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1
              className="text-2xl font-bold text-center text-red-500
          "
            >
              No se encontró el equipo con el método de calibración{' '}
              {calibration_method}
            </h1>
          </div>
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h1
            className="text-2xl font-bold text-center text-red-500
          "
          >
            El método de calibración no existe
          </h1>
        </div>
      )}
    </LayoutPage>
  )
}
