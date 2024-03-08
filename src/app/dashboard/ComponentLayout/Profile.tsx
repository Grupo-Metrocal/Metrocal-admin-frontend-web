'use client'
import { CButton } from '@/components/CButton'
import { CInput } from '@/components/CInput'
import { useForm } from '@/hooks/useForm'
import { fetchData } from '@/utils/fetch'
import { getCookie, setCookie } from 'cookies-next'
import Image from 'next/image'
import { toast } from 'sonner'
import metrocalLogo from 'public/metrocal.svg'
import { useRef, useState } from 'react'

export const Profile = () => {
  const [username, setUsername] = useState<string>(
    getCookie('username') as string,
  )

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const [imageUrl, setImageUrl] = useState<string>(
    getCookie('profile_img') as string,
  )

  const inputRefImg = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    try {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${getCookie('token')}`)

      const formdata = new FormData()
      if (selectedFile) {
        formdata.append('image', selectedFile, selectedFile.name)
      } else if (imageUrl !== 'null') {
        formdata.append('imageUrl', imageUrl)
      }

      formdata.append('username', username)

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
      }

      toast.loading('Actualizando perfil...')

      const response = await fetch(
        `${BASE_URL}users/profile-image-update/${getCookie('token')}`,
        requestOptions,
      )

      toast.dismiss()

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`)
      }

      const responseUser = await fetch(
        `${BASE_URL}users/data-user/${getCookie('token')}`,
        {
          method: 'GET',
          headers: myHeaders,
        },
      )

      if (!responseUser.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`)
      }

      const data = await responseUser.json()

      toast.dismiss()

      console.log(data)

      setCookie('username', data.username as string)
      setCookie('profile_img', data.imageURL as string)

      toast.success('Perfil actualizado', {
        description: 'Se actualizo correctamente el perfil',
      })
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
          console.log('value:' + target.value)
          setUsername(target.value)
        }}
      />

      <CButton widht="full" className="mt-4" uppercase={true} type="submit">
        Guardar
      </CButton>
    </form>
  )
}
