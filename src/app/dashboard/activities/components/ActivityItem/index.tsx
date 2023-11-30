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

export const ActivityItem = ({ activity }: { activity: IActivity }) => {
  const [responsable, setResponsable] = useState<ITeammember>({
    id: -1,
    username: '',
    email: '',
  })
  const [members, setMembers] = useState<ITeammember[]>([])

  const handleChangeResponsable = (member: ITeammember) => {
    setResponsable(member)
    toast.success('Has cambiado al responsable de la actividad')
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
      const newMembers = members.filter((member) => member.id !== id)
      setMembers(newMembers)
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
  }, [activity])

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
          <h3>{activity.quote_request.client.company_name}</h3>
          <span
            className="font-medium"
            title={activity.quote_request.equipment_quote_request
              .map((item) => item.type_service)
              .join(', ')}
          >
            Servicios solicitados:{' '}
            {activity.quote_request.equipment_quote_request.length}
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
            {activity.quote_request.client.requested_by}
          </span>
        </div>

        <div className="phone">
          <h3>Teléfono</h3>
          <span className="font-medium">
            {activity.quote_request.client.phone}
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
                setMembers={() => {}}
                responsable={responsable}
                handleChangeResponsable={handleChangeResponsable}
                handleAddMember={handleAddMember}
                handleRemoveMember={handleRemoveMember}
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
                    <span className="font-medium">{member.username}</span>
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
          <Link href={`/dashboard/quotes/view/${activity.quote_request.id}`}>
            Ver cotización
          </Link>
        </div>
      </div>
    </div>
  )
}
