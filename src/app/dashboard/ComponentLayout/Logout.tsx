import logoutIcon from '@/assets/icons/logout.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

export const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('token')
    deleteCookie('user')
    router.push('/login/signin')
  }

  return (
    <button
      className="flex items-center gap-2 p-2 text-[#dc2626] rounded-md hover:cursor-pointer shadow-md hover:shadow-lg transition shadow-red-200"
      onClick={handleLogout}
    >
      <Image src={logoutIcon} alt="Logout Icon" className="w-5 h-5 " />
      <span>Cerrar Sesión</span>
    </button>
  )
}
