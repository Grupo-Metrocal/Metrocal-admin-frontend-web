import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Prop {
  progress: number
}

export default function ProgressActivity({ progress }: Prop) {
  return (
    <Card className='bg-white'>
      <CardContent>
        <div className="pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className='font-semibold'>Progreso de la Actividad</span>
            <span>{progress}</span>
          </div>
          <Progress value={progress ?? 0} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}