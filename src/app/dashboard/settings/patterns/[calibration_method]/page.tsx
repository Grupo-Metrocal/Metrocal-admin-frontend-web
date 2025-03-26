'use client'
import { LayoutPage } from "@/components/LayoutPage";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePattern } from "./_hooks/usePattern";
import { Actions } from "./_components/actions";
import { Modal } from "@/components/Modal";
import { CreatePattern } from "./_components/createPattern";
import { CButton } from "@/components/CButton";
import { formatMethodName } from "@/utils/formatMethodName";


interface IProps {
  params: {
    calibration_method: string
  }
}

export default function Page({ params }: IProps) {
  const { calibration_method } = params
  const { patterns, updatePattern, createPattern, deletePattern, updatePatternStatus } = usePattern(calibration_method)

  return (
    <LayoutPage title={`Configuración / Patrones de certificación / ${formatMethodName({ method: calibration_method as any })}`} subTitle="Seleccione un metodo de calibración" rollBack>
      <div className="bg-white flex flex-col gap-6 p-4 rounded">
        <div>
          <Modal
            Component={() => <CreatePattern createPattern={createPattern} calibration_method={calibration_method} />}
            title={`Crear un nuevo patron para el metodo ${calibration_method}`}
            description="Si este nuevo patron no se encuentra dentro del motor Excel para calcular resultados, puede verse afectado en los resultados."
          >
            <CButton style={{ boxShadow: 'none' }}>
              Crear Patron
            </CButton>
          </Modal>
        </div>
        <Table className="bg-white rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de equipo</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Trazabilidad</TableHead>
              <TableHead>Siguiente calbiración</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              patterns && patterns.map((pattern) => (
                <TableRow key={pattern.id}>
                  <TableCell>{pattern.equipment}</TableCell>
                  <TableCell>{pattern.code}</TableCell>
                  <TableCell>{pattern.traceability}</TableCell>
                  <TableCell>{pattern.next_calibration}</TableCell>
                  <TableCell className="capitalize">{pattern.type}</TableCell>
                  <TableHead className={`${pattern.status ? 'bg-green-400' : 'bg-red-400'}`}>
                    {pattern.status ? 'Habilitado' : 'Inhabilitado'}
                  </TableHead>
                  <TableCell>
                    <Actions pattern={pattern} updatePattern={updatePattern} deletePattern={deletePattern} updatePatternStatus={updatePatternStatus} />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

      </div>
    </LayoutPage>
  )
}