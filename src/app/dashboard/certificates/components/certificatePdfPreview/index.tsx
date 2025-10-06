import { useEffect } from 'react'
import { Download, X, CheckCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlertDialogModal } from '@/components/AlertDialogModal'

interface CertificatePdfPreviewProps {
  pdfUrl: string | null
  certificateNo?: string
  onClose?: () => void
  onDownload?: () => void
  onApprove?: () => void
  onApproveAndSend?: () => void
}

export const CertificatePdfPreview = ({
  pdfUrl,
  certificateNo,
  onClose,
  onDownload,
  onApprove,
  onApproveAndSend,
}: CertificatePdfPreviewProps) => {
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

  if (!pdfUrl) {
    return null
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-gray-50 to-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Vista Previa del Certificado
            </h3>
            {certificateNo && (
              <p className="text-sm text-gray-600 mt-1">
                Certificado N° <span className="font-semibold text-gray-900">{certificateNo}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onDownload && (
            <Button
              variant="outline"
              size="default"
              onClick={onDownload}
              className="gap-2 hover:bg-blue-50 hover:border-blue-300"
            >
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
          )}

          {onApprove && (
            <AlertDialogModal
              onConfirm={onApprove}
              title="Aprobar Certificado"
              description="¿Está seguro de que desea aprobar este certificado? Verifique que todos los datos sean correctos."
              nameButton="Aprobar"
              nameButtonConfirm="Sí, Aprobar"
              nameButtonCancel="Cancelar"
              useButton
              buttonStyle={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.625rem 1rem",
                fontSize: "0.95rem",
                fontWeight: "500",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "none",
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
              }}
            />
          )}

          {onApproveAndSend && (
            <AlertDialogModal
              onConfirm={onApproveAndSend}
              title="Aprobar y Enviar Certificado"
              description="El certificado será aprobado y enviado automáticamente al correo del cliente. Verifique que los resultados sean correctos antes de continuar."
              nameButton="Aprobar y Enviar"
              nameButtonConfirm="Sí, Aprobar y Enviar"
              nameButtonCancel="Cancelar"
              useButton
              buttonStyle={{
                backgroundColor: "#22c55e",
                color: "white",
                padding: "0.625rem 1rem",
                fontSize: "0.95rem",
                fontWeight: "500",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "none",
                boxShadow: "0 2px 4px 0 rgb(34 197 94 / 0.2)"
              }}
            />
          )}

          {onClose && (
            <Button
              variant="ghost"
              size="default"
              onClick={onClose}
              className="gap-2 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
              Cerrar
            </Button>
          )}
        </div>
      </div>

      <div className="w-full rounded-lg border shadow-lg overflow-hidden bg-gray-50" style={{ height: '900px' }}>
        <iframe
          src={pdfUrl}
          title="Vista previa del certificado"
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}
