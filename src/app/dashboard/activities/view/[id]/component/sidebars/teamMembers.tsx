import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Data } from "../../interface"
import { Badge } from "@/components/ui/badge"
import { ItemUser } from "../ItemUser"

interface Props {
  data: Data
  responsable: number
  onDeleteUserFromActivity: (id: number) => void
  onChangeResponsable: (id: number) => void
}

export default function TeamMember({ data, responsable, onDeleteUserFromActivity, onChangeResponsable }: Props) {
  return (
    <Card className='bg-white'>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Equipo de Trabajo
          <Badge variant="outline" className="text-xs">
            {data?.team_members.length} miembros
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data?.team_members.map((member) => (
            <ItemUser
              key={member.id}
              member={member}
              activityID={data?.id || 0}
              responsable={responsable}
              onDeleteUserFromActivity={onDeleteUserFromActivity}
              onChangeResponsable={onChangeResponsable}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}