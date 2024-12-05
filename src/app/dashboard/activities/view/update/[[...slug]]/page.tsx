import './index.scss'
import { LayoutPage } from '@/components/LayoutPage'
import { P_01 } from '../methods/p_01'
import { T_03 } from '../methods/t_03'
import { T_01 } from '../methods/t_01'
import { T_05 } from '../methods/t_05'
import { V_01 } from '../methods/v_01'
import { M_01 } from '../methods/m_01'
import { fetchData } from '@/utils/fetch'
import { D_01 } from '../methods/d_01'
import { D_02 } from '../methods/d_02'
import { B_01 } from '../methods/b_01'
import { Generic_method } from '../methods/generic_method'

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
  'NI-MCIT-T-01': T_01,
  'NI-MCIT-T-05': T_05,
  'NI-MCIT-V-01': V_01,
  'NI-MCIT-M-01': M_01,
  'NI-MCIT-D-01': D_01,
  'NI-MCIT-D-02': D_02,
  'NI-MCIT-B-01': B_01,
  'GENERIC_METHOD': Generic_method,
}
export default async function Page({ params }: IRoot) {
  const { slug } = params
  const id = slug[0]
  const calibration_method = slug[1]
  const activity_id = slug[2]
  const equipment_id = slug[3]

  const Renderer =
    RENDERER_METHOD[calibration_method as keyof typeof RENDERER_METHOD]

  const equipment = await getEquipment(id, calibration_method)

  return (
    <LayoutPage
      title={`Modificación de resultados en método ${calibration_method === 'GENERIC_METHOD' ? 'Comp. Directa Trazable' : calibration_method}`}
      rollBack
    >
      {Renderer ? (
        equipment.data ? (
          <Renderer equipment={equipment.data} activity_id={activity_id} equipment_id={Number(equipment_id)} />
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
