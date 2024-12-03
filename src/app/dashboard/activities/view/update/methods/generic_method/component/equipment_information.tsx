import { AutocompleteInput } from '@/components/AutocompleteInput'
import { useForm } from '@/hooks/useForm'
import { CInput } from '@/components/CInput'
import { AlertDialogModal } from '@/components/AlertDialogModal'
import { IEquipmentInformation } from '../../../../[id]/interface/generic_method'

export const EquipmentInformation = ({
  equipment,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IEquipmentInformation,
    url: string,
    useActivityID?: boolean,
  ) => void
  equipment: IEquipmentInformation
}) => {
  const { values, handleInputChange, handleSelectChange } = useForm(equipment);

  const url = `methods/generic-method/equipment-information/`
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AutocompleteInput
          requiredLabel
          value={values?.device}
          label="Dispositivo"
          name="device"
          onChange={handleInputChange}
          required
          placeholder="Escriba o seleccione su dispositivo"
          list={[
            // { id: 1, name: 'Micrómetro' },
            // { id: 2, name: 'Pie de Rey' },
            // { id: 3, name: 'Juego de Bloques Patrón' },
            // { id: 4, name: 'Higro Termómetro' },
            // { id: 5, name: 'Higro Termómetro' },
            // { id: 6, name: 'Higro Termómetro' },
          ]}
          keyList="device"
        />
        <CInput
          label="Fabricante"
          name="maker"
          value={values?.maker}
          onChange={handleInputChange}
        />
        <CInput
          label="Número de serie"
          name="serial_number"
          value={values?.serial_number}
          onChange={handleInputChange}
        />
        <CInput
          label="Modelo"
          name="model"
          value={values?.model}
          onChange={handleInputChange}
        />

        <CInput
          label="Rango minimo"
          name="range_min"
          value={values?.range_min}
          onChange={handleInputChange}
          type="number"
        />

        <CInput
          label="Rango maximo"
          name="range_max"
          value={values?.range_max}
          onChange={handleInputChange}
          type="number"
        />

        <CInput
          label="Intervalo de escala"
          name="scale_interval"
          value={values?.scale_interval}
          onChange={handleInputChange}
          type="number"
        />
        <CInput
          label="Código"
          name="code"
          value={values?.code}
          onChange={handleInputChange}
        />
        <CInput
          label="Sitio de estabilización"
          name="estabilization_site"
          value={values?.estabilization_site}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(values, url)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
