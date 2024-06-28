import { AlertDialogModal } from '@/components/AlertDialogModal'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const sendReview = async (activityID: number) => {
  const response = await fetchData({
    url: `activities/review-activity/${activityID}`,
    method: 'POST',
    body: {
      token: getCookie('token'),
    },
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
  })
  console.log(response)

  return response
}

export const ReviewActivity = ({ activityID }: { activityID: number }) => {
  const router = useRouter()

  const handleConfirmReview = async () => {
    toast.loading('Confirmando...')
    const response = await sendReview(activityID)

    toast.dismiss()

    if (response.success) {
      toast.success('Actividad revisada correctamente')
      router.push('/dashboard/activities')
    } else {
      toast.error('Actividad en proceso', {
        description: response.details,
      })
    }
  }

  return (
    <div className="flex justify-end mt-4">
      <AlertDialogModal
        onConfirm={handleConfirmReview}
        nameButton="Confirmar revisión"
        title="Revisión de actividad"
        description="Al confirmar la revisión de la actividad, esta se marcará como revisada y habilitaras la emición de certificados"
      />
    </div>
  )
}
