import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

const SIZE_DIALOG = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
}

interface ModalProps {
  nameButton: string
  title?: string
  description?: string
  Component?: React.FC
  buttonStyle?: React.CSSProperties
  size?: keyof typeof SIZE_DIALOG
  className?: string
  icon?: any
  marginIcon?: string
}

export const Modal = ({
  nameButton,
  title,
  Component,
  buttonStyle,
  description,
  size = '3xl',
  className,
  icon,
  marginIcon,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`${className} ${icon && 'flex items-center'}`}
        style={buttonStyle}
      >
        {icon && (
          <Image
            src={icon}
            style={{ marginRight: marginIcon }}
            alt="icon"
            width={16}
            height={16}
          />
        )}
        {nameButton}
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: '#fff',
        }}
        className={`${SIZE_DIALOG[size]}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {Component && <Component />}
      </DialogContent>
    </Dialog>
  )
}
