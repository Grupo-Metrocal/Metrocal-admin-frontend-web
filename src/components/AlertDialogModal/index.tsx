import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface AlertDialogModalProps {
  nameButton: string
  title?: string
  description?: string
  onConfirm: () => void
  nameButtonConfirm?: string
  nameButtonCancel?: string
  buttonStyle?: React.CSSProperties
}

export const AlertDialogModal = ({
  nameButton,
  title,
  description,
  onConfirm,
  nameButtonConfirm,
  nameButtonCancel,
  buttonStyle,
}: AlertDialogModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="c-button" style={buttonStyle}>
        {nameButton}
      </AlertDialogTrigger>
      <AlertDialogContent
        style={{
          backgroundColor: '#fff',
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            style={{
              border: 'none',
            }}
          >
            {nameButtonCancel || 'Cancelar'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            style={{
              background: '#09f',
              color: '#fff',
            }}
          >
            {nameButtonConfirm || 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
