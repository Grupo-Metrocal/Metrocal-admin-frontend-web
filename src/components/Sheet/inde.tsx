import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type Props = {
  children: React.ReactNode
  title?: string
  description?: string
  Component?: React.ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
  styles?: React.CSSProperties
}
export function CSheet({
  children,
  title,
  description,
  position = 'right',
  Component,
  styles,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-white" side={position} style={styles}>
        <SheetHeader className="mb-4">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {Component}
      </SheetContent>
    </Sheet>
  )
}
