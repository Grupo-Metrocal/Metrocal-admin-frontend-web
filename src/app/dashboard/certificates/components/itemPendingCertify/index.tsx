import { ChevronRight } from 'lucide-react'
import { IPendingActivities } from '../../interface/pendingActivities'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/utils/formatPrice'

export const ItemPendingCertify = ({
  activity,
  selectedActivity,
  onClick,
}: {
  activity: IPendingActivities
  selectedActivity: IPendingActivities
  onClick: (activity: IPendingActivities) => void
}) => {

  const certCount = Array.isArray(activity?.quoteRequest?.equipment_quote_request)
    ? activity.quoteRequest.equipment_quote_request.reduce((acc, item) => acc + (item.count || 0), 0)
    : 0

  return (
    <Card
      key={activity.id}
      className={`cursor-pointer transition-all hover:shadow-md ${selectedActivity?.id === activity.id
        ? 'ring-2 ring-blue-500 bg-blue-50'
        : ''
        }`}
      onClick={() => onClick(activity)}
    >
      <CardContent className='p-4'>
        <div className="flex items-start justify-between mb-2">
          <div className='flex flex-col gap-2'>
            <p className={`w-fit border py-1 px-3  rounded-full text-sm font-medium ${certCount > 0 ? 'text-blue-600 bg-blue-100  border-blue-500' : 'bg-orange-100 text-orange-500'}`}>
              {
                certCount > 0
                  ? 'Pendiente de certificación'
                  : 'Sin equipos para certificar'
              }
            </p>
            <p className="text-sm font-medium text-gray-900">
              {activity.quoteRequest.client.email}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>

        <h4 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">{activity.quoteRequest.client.company_name}</h4>
        <p className="text-sm text-gray-500 mb-2">{activity.quoteRequest.no}</p>
        <div className={`flex items-center justify-between text-xs ${certCount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
          <span>{certCount} equipos a certificar</span>
          {activity.quoteRequest.price && <span className="font-medium text-gray-500">C$ {formatPrice(activity.quoteRequest.price)}</span>}
        </div>
      </CardContent>
    </Card >
  )
}
