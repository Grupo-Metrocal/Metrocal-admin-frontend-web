'use client'
import './index.scss'
import { useState, useEffect } from 'react'
import type { IActivity, ITeammember } from '@/types/activities'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import alertIcon from '@/assets/icons/alert.svg'
import { Modal } from '@/components/Modal'
import Link from 'next/link'
import { AddMember } from '../AddMember'
import { toast } from 'sonner'
import { fetchData } from '@/utils/fetch'
import { getCookie } from 'cookies-next'

export const ActivityItem = ({ activity }: { activity: IActivity }) => {
  const [responsable, setResponsable] = useState<ITeammember>({
    id: -1,
    username: '',
    email: '',
  })
  const [members, setMembers] = useState<ITeammember[]>([])
  const [flag, setFlag] = useState<boolean>(false)

  const handleChangeResponsable = async (member: ITeammember) => {
    const response = await fetchData({
      url: 'activities/assign-responsable',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: {
        activityId: activity.id,
        memberId: member.id,
      },
    })

    if (response.success) {
      toast.success('Se han guardado los cambios', {
        description: 'Has asignado un nuevo responsable a la actividad',
      })
      setResponsable(member)
    } else {
      toast.error('No se han podido guardar los cambios', {
        description: response.details || response.message,
      })
    }
  }

  const handleAddMember = (member: ITeammember) => {
    const memberExist = members.find((item) => item.id === member.id)

    if (memberExist) {
      toast.error('El trabajador ya se encuentra asignado')
    } else {
      setMembers([...members, member])

      if (responsable.id === -1) {
        setResponsable(member)

        toast.success('Trabajador asignado como responsable de la actividad')
      }
    }
  }

  const handleRemoveMember = (id: number) => {
    if (id === responsable.id) {
      toast.error('No se puede eliminar al responsable')
    } else {
      setRemoveMemberToServer(id)
    }
  }

  const sendMembersToServer = async () => {
    const membersOutActivity = [] as ITeammember[]
    members.forEach((member) => {
      const memberExist = activity.team_members.find(
        (item) => item.id === member.id,
      )

      if (!memberExist) {
        membersOutActivity.push(member)
      }
    })

    if (!membersOutActivity.length) {
      toast('No se han realizado cambios')
      return
    }

    toast.loading('Guardando cambios...')

    const response = await fetchData({
      url: 'activities/assign-members',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: {
        activityId: activity.id,
        teamMembersID: membersOutActivity.map((member) => member.id as number),
      },
    })

    toast.dismiss()

    if (response.success) {
      toast.success('Se han guardado los cambios', {
        description: 'Has añadido nuevos trabajadores a la actividad',
      })

      activity.team_members.push(...membersOutActivity)

      setFlag(!flag)
    } else {
      toast.error('No se han podido guardar los cambios', {
        description: response.details,
      })
    }
  }

  const setRemoveMemberToServer = async (id: number) => {
    const response = await fetchData({
      url: 'activities/remove-member',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: {
        activityId: activity.id,
        memberId: id,
      },
    })

    if (response.success) {
      toast.success('Se han guardado los cambios', {
        description: 'Has eliminado un trabajador de la actividad',
      })

      setMembers(response.data)
    } else {
      toast.error('No se han podido guardar los cambios', {
        description: response.details,
      })
    }
  }
  useEffect(() => {
    const responsable = activity.responsable

    const user = activity.team_members.find(
      (member) => member.id === responsable,
    )

    if (user) {
      setResponsable(user)
    }

    setMembers(activity.team_members)
  }, [activity, flag])

  return (
    <div className="activity-item" id={activity.id.toString()}>
      <div className="activity-item__info">
        <div className="responsable">
          <Image
            src={responsable.imageURL ? responsable.imageURL : metrocalLogo}
            alt="Profile"
            width={40}
            height={40}
          />
          <div className="user">
            <h3 className="font-bold">
              {responsable.id === -1
                ? 'Sin asignar'
                : responsable.username.split(' ')[0]}
            </h3>
            <span className="font-medium">Responsable</span>
          </div>
        </div>

        <div className="client">
          <h3>{activity.quote_request?.client.company_name}</h3>
          <span
            className="font-medium"
            title={activity.quote_request?.equipment_quote_request
              .map((item) => item.type_service)
              .join(', ')}
          >
            Servicios solicitados:{' '}
            {activity.quote_request?.equipment_quote_request.length}
            <Image src={alertIcon} alt="Alert" width={14} />
          </span>
        </div>
        <div className="progress">
          <h3>Progreso</h3>
          <div
            className="progress-bar"
            data-progress={`${activity.progress} %`}
          >
            <div
              className="progress-bar__fill"
              style={{ width: `${activity.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="requested_by">
          <h3>Solicitado por</h3>
          <span className="font-medium">
            {activity.quote_request?.client.requested_by}
          </span>
        </div>

        <div className="phone">
          <h3>Teléfono</h3>
          <span className="font-medium">
            {activity.quote_request?.client.phone}
          </span>
        </div>
      </div>

      <div className="activity-item__actions">
        <div className="add_member">
          <Modal
            title="Asignar trabajadores"
            description="Seleccione los trabajadores encargado
            de gestionar los servicios de la actividad."
            nameButton="+"
            buttonStyle={{
              backgroundColor: '#edebeb',
              width: '100%',
              fontSize: '1.5em',
              borderRadius: '3em',
            }}
            size="lg"
            Component={() => (
              <AddMember
                members={members}
                responsable={responsable}
                handleChangeResponsable={handleChangeResponsable}
                handleAddMember={handleAddMember}
                handleRemoveMember={handleRemoveMember}
                sendMembersToServer={sendMembersToServer}
              />
            )}
          />
        </div>

        <div className="members">
          {members.length > 1 ? (
            members.map((member) => {
              return (
                member.id != responsable.id && (
                  <div className="member" key={member.id}>
                    <Image
                      src={member.imageURL ? member.imageURL : metrocalLogo}
                      alt="Profile"
                      width={32}
                      height={32}
                    />
                    <span
                      className="font-medium"
                      style={{
                        color: activity.team_members.find(
                          (item) => item.id === member.id,
                        )
                          ? ''
                          : 'tomato',
                      }}
                      title={
                        activity.team_members.find(
                          (item) => item.id === member.id,
                        )
                          ? ''
                          : 'Guardar cambios para añadir al trabajador'
                      }
                    >
                      {member.username}
                    </span>
                  </div>
                )
              )
            })
          ) : members.length === 1 ? (
            <div className="flex justify-center items-center">
              <span>Sin acompañantes</span>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <span>No se han asignado trabajadores</span>
            </div>
          )}
        </div>

        <div className="activity-item__actions__links">
          <Link href={`/dashboard/activities/view/${activity.id}`}>
            Detalles de la actividad
          </Link>
          <Link href={`/dashboard/quotes/view/${activity.quote_request?.id}`}>
            Ver cotización
          </Link>
        </div>
      </div>
    </div>
  )
}
