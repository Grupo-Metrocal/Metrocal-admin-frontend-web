import { AutocompleteInput } from '@/components/AutocompleteInput'
import { CButton } from '@/components/CButton'
import type { ITeammember } from '@/types/activities'
import type { IUser } from '@/app/dashboard/users/page'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import { AlertDialogModal } from '@/components/AlertDialogModal'

const getData = async () => {
  const response = await fetchData({
    url: 'users',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })

  return response
}

interface AddMemberProps {
  members: ITeammember[]
  setMembers: React.Dispatch<React.SetStateAction<ITeammember[]>>
  responsable?: ITeammember
  handleChangeResponsable: (member: ITeammember) => void
  handleRemoveMember: (id: number) => void
  handleAddMember: (member: ITeammember) => void
}
export const AddMember = ({
  members,
  setMembers,
  responsable,
  handleChangeResponsable,
  handleRemoveMember,
  handleAddMember,
}: AddMemberProps) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  const useAddMember = () => {
    if (!selectedUser) toast.error('El usuario no existe')
    else handleAddMember(selectedUser as ITeammember)
  }

  useEffect(() => {
    getData().then((response) => {
      if (response.success) {
        setUsers(response.data)
      } else {
        setUsers([])
      }
    })
  }, [])

  return (
    <div className="add-member h-80 flex items-center flex-col gap-2">
      <div className="w-full flex justify-between items-center gap-4">
        <AutocompleteInput
          onChange={(e) => {
            const user = users.find((user) => user.username === e.value)
            setSelectedUser(user || null)
          }}
          name="users"
          setItemSelected={(id) => {
            const user = users.find((user) => user.id === id)
            setSelectedUser(user || null)
          }}
          list={users.map((user) => ({
            id: user.id,
            name: user.username,
          }))}
          placeholder="Selecciona un usuario"
          className="w-full"
          keyList="users"
        />

        <CButton
          style={{
            borderRadius: '50%',
            padding: '0.5rem',
            width: '25px',
            height: '25px',
            fontSize: '1.2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'none',
            fontWeight: '400',
          }}
          onClick={useAddMember}
        >
          +
        </CButton>
      </div>

      <div className="list mt-4 flex flex-col gap-4 h-full w-full overflow-y-auto pr-4">
        {members.length > 0 ? (
          members.map((member: ITeammember) => {
            return (
              <div className="flex gap-2" key={member.id}>
                <AlertDialogModal
                  useCheckbox={true}
                  key={member.id}
                  onConfirm={() => handleChangeResponsable(member)}
                  checked={responsable?.id === member.id}
                  title="¿Estás seguro de que quieres cambiar el responsable?"
                />

                <Image
                  src={member.imageURL ? member.imageURL : metrocalLogo}
                  alt="Profile"
                  width={32}
                  height={32}
                />
                <span className="font-medium flex flex-col">
                  {member.username}
                  {responsable?.id === member.id && (
                    <span className="text-xs text-gray-400">Responsable</span>
                  )}
                </span>

                <CButton
                  style={{
                    background: 'none',
                    boxShadow: 'none',
                    padding: '0',
                    margin: '0',
                    color: 'tomato',
                    marginLeft: 'auto',
                  }}
                  onClick={() => handleRemoveMember(member.id)}
                >
                  X
                </CButton>
              </div>
            )
          })
        ) : (
          <div className="flex justify-center items-center">
            No hay miembros
          </div>
        )}
      </div>

      <div className="flex justify-center w-full mt-auto">
        <CButton>Guardar cambios</CButton>
      </div>
    </div>
  )
}
