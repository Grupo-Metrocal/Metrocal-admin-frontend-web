import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IPendingActivities } from "../../interface/pendingActivities"
import { Mail, Users } from "lucide-react"

interface Props {
  selectedActivity: IPendingActivities
}

export const TabDetails = ({ selectedActivity }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          Equipo Técnico
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-auto">
        <div className="grid gap-4">
          {selectedActivity?.team_members.length > 0 ? (
            selectedActivity?.team_members.map((member) => (
              <div key={member.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {member.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{member.username}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
              </div>
            ))
          ) : (
            <p className='text-[#999]'>No hay técnicos asignados</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}