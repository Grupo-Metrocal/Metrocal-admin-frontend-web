'use client'
import React, { useState } from 'react'
import { IPreinstallationcomment } from '../../../../[id]/interface/d_01'
import { AlertDialogModal } from '@/components/AlertDialogModal'

export const PreInstallationComment = ({
  preInstalacionComentario,
  handleSaveInformation,
}: {
  handleSaveInformation: (
    values: IPreinstallationcomment,
    url: string,
    useActivityID?: boolean,
  ) => void
  preInstalacionComentario: IPreinstallationcomment
}) => {
  const url = `methods/ni-mcit-d-01/pre-installation-comment/`
  const [data, setData] = useState(preInstalacionComentario)

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = () => {
    handleSaveInformation(data, url)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label>
          Comment:
          <textarea
            name="comment"
            value={data?.comment}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label>
          Accredited:
          <input
            type="checkbox"
            name="accredited"
            checked={data?.accredited}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <AlertDialogModal
          title="Guardar modificaciones"
          description="¿Estás seguro de guardar las modificaciones?"
          onConfirm={() => handleSaveInformation(data, url, false)}
          nameButton="Guardar modificaciones"
          buttonStyle={{
            margin: '1em 0',
          }}
        />
      </div>
    </div>
  )
}
