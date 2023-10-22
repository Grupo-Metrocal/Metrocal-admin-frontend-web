import { Combobox } from '@/components/ComboBox'
import { Modal } from '@/components/Modal'
import type { IUser } from '../page'
import { CreateUsers } from './createUser'

type Props = {
  users: IUser[]
}
export const SearchUsers = ({ users }: Props) => {
  return (
    <div className="search_user-content">
      <div className="search">
        <Combobox
          name="buscar usuario"
          list={
            users
              ? users?.map((user) => ({
                  label: user.username,
                  value: user.id?.toString(),
                }))
              : []
          }
          style={{ width: '100%' }}
        />
      </div>
      <div className="create-user mt-2">
        <Modal
          className="c-button"
          description="Registra un nuevo usuario en el sistema de forma manual"
          size="lg"
          nameButton="Crear nuevo usuario"
          title="Crear nuevo usuario"
          buttonStyle={{
            boxShadow: 'none',
            width: '100%',
          }}
          Component={CreateUsers}
        />
      </div>
    </div>
  )
}
