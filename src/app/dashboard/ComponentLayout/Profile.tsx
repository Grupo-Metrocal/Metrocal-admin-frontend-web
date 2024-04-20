'use client'
import { CButton } from '@/components/CButton'
import { CInput } from '@/components/CInput'
import { fetchData } from '@/utils/fetch'
import { getCookie, setCookie } from 'cookies-next'
import Image from 'next/image'
import { toast } from 'sonner'
import metrocalLogo from 'public/metrocal.svg'
import { useRef, useState } from 'react'

const deleteImage = async (imageUrl: string) => {
  const filename = imageUrl.split('/').pop()

  const deletedImg = await fetchData({
    url: `images/delete/${filename}`,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
  })

  return deletedImg
}

export const Profile = () => {
  const [username, setUsername] = useState<string>(
    getCookie('username') as string,
  )
  const [imageUrl, setImageUrl] = useState<string>(
    getCookie('profile_img') as string,
  )

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const inputRefImg = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    try {
      let image = ''
      if (selectedFile) {
        toast.loading('Actualizando foto de perfil...')

        const formDataImg = new FormData()
        formDataImg.append('file', selectedFile as Blob)

        await deleteImage(getCookie('profile_img') as string)

        const response = await fetch(`${BASE_URL}images/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
          body: formDataImg,
        })

        const data = await response.json()

        if (data.success) {
          setImageUrl(data.data.imageURL)
          image = data.data.imageURL
        } else {
          toast.error('Error al subir la imagen', {
            description: data.message,
          })
          return
        }
      }

      toast.dismiss()
      toast.loading('Actualizando perfil...')

      const response = await fetchData({
        url: `users/profile/update/${getCookie('token')}`,
        method: 'POST',
        body: {
          username,
          imageURL: image === 'null' ? null : image,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })
      toast.dismiss()

      if (response.success) {
        setCookie('username', username)
        image && setCookie('profile_img', image)

        toast.success('Perfil actualizado correctamente')
      } else {
        toast.error('Error al actualizar el perfil', {
          description: response.message,
        })
      }
    } catch (error: any) {
      toast.error('Error al actualizar el perfil', {
        description: error.message,
      })
    }
  }

  return (
    <form className="profile-edit" onSubmit={handleSubmit}>
      <div className="update-profile flex justify-center my-4 flex-col items-center">
        <Image
          src={
            selectedFile
              ? URL.createObjectURL(selectedFile)
              : imageUrl === 'null'
              ? metrocalLogo
              : imageUrl
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
          onChange={handleFileChange}
        />
        <span>{getCookie('profile_role')}</span>
      </div>

      <CInput
        label="Nombre de usuario"
        value={username}
        type="text"
        required
        name="username"
        onChange={(target) => {
          setUsername(target.value)
        }}
      />

      <CButton widht="full" className="mt-4" uppercase={true} type="submit">
        Guardar
      </CButton>
    </form>
  )
}
