import { ReportMethodActivity } from "@/components/ReportMethodActivity"
import { IPreinstallationcomment } from "../../interface/d_01"

interface IPreinstallationcommentProps {
    preinstallationcomment: IPreinstallationcomment
    id: number
    method_name: string
    report_status: boolean
    report_messages: string[]
    }
    
    export const PreinstallationComment = ({
        preinstallationcomment,
        id,
        method_name,
        report_status,
        report_messages,
        }: IPreinstallationcommentProps) => {
        return (
            <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Item title="Comentario" value={preinstallationcomment?.comment} />
                </div>
                <ReportMethodActivity
                    method_name={method_name}
                    zone={'Comentario de preinstalación'}
                    method_id={id}
                    report_messages={report_messages}
                    report_status={report_status}
                />
            </div>
        )
    }

    interface Props {
        title: string
        value: string
      }
      export const Item = ({ title, value }: Props) => {
        return (
          <div>
            <p className="text-sm font-semibold text-gray-500">{title}</p>
            <span className="text-sm font-semibold text-gray-800">
              {value || '---'}
            </span>
          </div>
        )
      }