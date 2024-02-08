import { CarouselItem } from '@/components/ui/carousel'

interface ICarouselItem {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
export function CarouselItemComp({
  children,
  className,
  onClick,
}: ICarouselItem) {
  return (
    <CarouselItem className={className} onClick={onClick}>
      <div className="p-1">{children}</div>
    </CarouselItem>
  )
}
