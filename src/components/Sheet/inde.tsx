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
}
export function CSheet({
  children,
  title,
  description,
  position = 'right',
  Component,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-white" side={position}>
        <SheetHeader className="mb-4">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {Component}
      </SheetContent>
    </Sheet>
  )
}
