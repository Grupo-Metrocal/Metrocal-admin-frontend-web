'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { CButton } from '@/components/CButton'
import { toast } from 'sonner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { Mail, Users, Send, X } from 'lucide-react'

interface IRecipient {
  email: string
  company_name: string
}

interface IProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedClients: IRecipient[]
  onSuccess?: () => void
}

export const BulkEmailModal = ({
  open,
  onOpenChange,
  selectedClients,
  onSuccess,
}: IProps) => {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)

  const handleClose = () => {
    if (sending) return
    onOpenChange(false)
  }

  const handleSend = async () => {
    if (!subject.trim()) return toast.error('El asunto es requerido')
    if (!body.trim()) return toast.error('El cuerpo del mensaje es requerido')

    setSending(true)
    toast.loading('Enviando correos...')

    try {
      const response = await fetchData({
        url: 'clients/send-bulk-email',
        method: 'POST',
        body: {
          emails: selectedClients.map((c) => c.email),
          subject: subject.trim(),
          body: body.trim(),
        },
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })

      toast.dismiss()

      if (response.success) {
        toast.success(
          `Correo enviado a ${selectedClients.length} cliente${selectedClients.length > 1 ? 's' : ''} correctamente`,
        )
        setSubject('')
        setBody('')
        onOpenChange(false)
        onSuccess?.()
      } else {
        toast.error('No se pudo enviar el correo')
      }
    } catch {
      toast.dismiss()
      toast.error('Error al enviar el correo')
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0" style={{ backgroundColor: '#fff' }}>
        {/* Modal header */}
        <div className="bg-gradient-to-r from-[#0199d4] to-[#0178a8] px-6 py-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2.5 text-white text-lg font-bold">
              <div className="bg-white/20 rounded-lg p-1.5">
                <Mail className="h-4 w-4 text-white" />
              </div>
              Enviar correo masivo
            </DialogTitle>
            <DialogDescription className="text-white/70 text-sm mt-1">
              El correo será enviado a{' '}
              <span className="text-white font-semibold">
                {selectedClients.length} cliente{selectedClients.length > 1 ? 's' : ''}
              </span>{' '}
              seleccionado{selectedClients.length > 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Recipients */}
          <div className="bg-[#e6f7fc] border border-[#b3e8f8] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-[#0199d4]" />
              <span className="text-xs font-semibold text-[#0199d4] uppercase tracking-wide">
                Destinatarios ({selectedClients.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {selectedClients.map((c) => (
                <span
                  key={c.email}
                  className="bg-white border border-[#b3e8f8] rounded-full px-3 py-1 text-xs text-gray-700 font-medium flex items-center gap-1 shadow-sm"
                  title={c.email}
                >
                  {c.company_name}
                </span>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Asunto *
            </label>
            <input
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0199d4]/25 focus:border-[#0199d4] transition-all placeholder:text-gray-400"
              placeholder="Escribe el asunto del correo..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={sending}
            />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Mensaje *
            </label>
            <textarea
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0199d4]/25 focus:border-[#0199d4] transition-all placeholder:text-gray-400 resize-none"
              placeholder="Escribe el contenido del mensaje que recibirán los clientes..."
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={sending}
            />
            <p className="text-xs text-gray-400 text-right">{body.length} caracteres</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-100">
            <button
              onClick={handleClose}
              disabled={sending}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
            <CButton onClick={handleSend} disabled={sending}>
              <Send className="h-4 w-4" />
              {sending
                ? 'Enviando...'
                : `Enviar a ${selectedClients.length} cliente${selectedClients.length > 1 ? 's' : ''}`}
            </CButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
