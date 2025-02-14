import { formatDate } from "@/utils/formatDate"
import { Engine } from "../../../excel-engine/[calibration_method]/_hooks/useExcelEngine"
import { Download, Edit, FileCogIcon, Trash, Upload } from "lucide-react";
import { useState } from "react";
import { downloadAlternativeExcelEngine, downloadInternExcelEngine } from "@/utils/downloadExcelEngine";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

interface IProps {
  engineRef: Engine
  deleteEngine: (id: number, file_name: string) => void
}

export const ItemEngine = ({ engineRef, deleteEngine }: IProps) => {
  const [engine, setEngine] = useState<Engine>(engineRef)
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      if (file) {
        toast.loading('Subiendo archivo...', {
          description: 'Espere un momento por favor',
          duration: 50000,
        });

        const formDataEngine = new FormData();
        formDataEngine.append('file', file as Blob);

        const response = await fetch(`${BASE_URL}engines/upload/alternative-engine/engineId/${engine.id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
          body: formDataEngine,
        }) as Response;
        const data = await response.json();

        toast.dismiss();

        if (data.success) {
          setFile(null);
          setEngine({ ...engine, alternative_path: data.data.fileURL });
          toast.success('Archivo subido con éxito');
        } else {
          toast.error('Error al subir el archivo', {
            description: data.message,
          });
        }
      }
    } catch (error) {
      toast.error('Error al subir el archivo', {
        description: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };


  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <FileCogIcon size={24} className="text-blue-600" />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{engine.calibration_method}</h3>
              {engine.pattern && (
                <p className="text-sm font-semibold text-gray-600 mt-1">Patrón dedicado: {engine.pattern}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Última actualización: {formatDate(engine.updated_at)}
              </p>
            </div>

            {engine.default_path && (
              <button
                onClick={() => downloadInternExcelEngine({ path: engine.default_path, name: engine.file_name })}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download size={18} />
                <span className="text-sm font-medium">Descargar por defecto</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {engine.alternative_path ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => downloadAlternativeExcelEngine({ path_name: engine.alternative_path })}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download size={18} />
                <span className="text-sm font-medium">Descargar alternativo</span>
              </button>
              <label htmlFor={`file-upload-${engine.id}`} className="cursor-pointer">
                <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors">
                  <Edit size={18} />
                  <span className="text-sm font-medium">Cambiar</span>
                </div>
                <input
                  id={`file-upload-${engine.id}`}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".xlsx"
                />
              </label>
              <button
                onClick={() => {
                  deleteEngine(engine.id, engine.alternative_path)
                  setEngine({ ...engine, alternative_path: '' })
                }}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash size={18} />
                <span className="text-sm font-medium">Eliminar</span>
              </button>
            </div>
          ) : (
            <label htmlFor={`file-upload-${engine.id}`} className="cursor-pointer">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                <Upload size={18} />
                <span className="text-sm font-medium">Subir alternativo</span>
              </div>
              <input
                id={`file-upload-${engine.id}`}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xlsx"
              />
            </label>
          )}
        </div>
      </div>

      {file && (
        <div className="mt-4">
          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {engine.alternative_path ? 'Actualizar archivo alternativo' : 'Subir archivo alternativo'}
          </button>
        </div>
      )}
    </div>
  );
};
