'use client'
import { CButton } from '@/components/CButton'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import { fetchData } from '@/utils/fetch'
import { getCookie, setCookie } from 'cookies-next'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hook'
import { toast } from 'sonner'
import metrocalLogo from 'public/metrocal.svg'
import { useRef, useState } from 'react'

export const Profile = () => {
  const { values, handleInputChange } = useForm({
    username: getCookie('username') as string,
  })

  const [image, setImage] = useState<File | null>(null)
  const { profile } = useAppSelector((state) => state.profile)

  const inputRefImg = useRef<HTMLInputElement>(null)

  const handleUpdateProfile = async () => {
    toast.loading('Actualizando perfil...')
    const response = await fetchData({
      url: `users/profile/${getCookie('token')}`,
      method: 'PUT',
      body: {
        username: values.username,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Perfil actualizado', {
        description: 'Se actualizo correctamente el perfil',
      })
      setCookie('username', values.username)
    } else {
      toast.error('Error al actualizar el perfil', {
        description: response.message | response.details,
      })
    }
  }

  const handleUploadImage = (e: any) => {
    const file = e.target.files[0]

    if (file) {
      setImage(file)
    }
  }

  return (
    <div className="profile-edit">
      <div className="update-profile flex justify-center my-4">
        <Image
          src={
            image
              ? URL.createObjectURL(image)
              : profile?.imageURL
              ? profile?.imageURL
              : metrocalLogo
          }
          alt="Profile"
          width={100}
          height={100}
          style={{
            width: '100px',
            height: '100px',
          }}
          className="my-4 object-cover rounded-full border-4 hover:cursor-pointer hover:border-sky-600 transition"
          onClick={() => inputRefImg.current?.click()}
        />
        <input
          type="file"
          name="upload"
          id="upload"
          hidden
          ref={inputRefImg}
          accept=".jpg, .jpeg, .png"
          onChange={handleUploadImage}
        />
        <span>{profile?.role?.label}</span>
      </div>

      <CInput
        label="Nombre de usuario"
        value={values.username}
        type="text"
        required
        name="username"
        onChange={(e) => handleInputChange(e)}
      />

      <CButton
        widht="full"
        className="mt-4"
        uppercase={true}
        onClick={handleUpdateProfile}
      >
        Guardar
      </CButton>
    </div>
  )
}
