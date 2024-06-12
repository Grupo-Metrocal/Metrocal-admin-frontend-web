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
    <CarouselItem className={`mt-4 ${className}`} onClick={onClick}>
      <div className="p-1 child">{children}</div>
    </CarouselItem>
  )
}
