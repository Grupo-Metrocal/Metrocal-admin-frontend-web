export interface IActivity {
  id: number
  status: string
  progress: number
  created_at: string
  updated_at?: any
  responsable?: any
  quote_request: Quoterequest
  team_members: ITeammember[]
}
export interface ITeammember {
  id: number
  username: string
  email: string
  imageURL?: string
}
interface Quoterequest {
  id: number
  status: string
  general_discount: number
  tax: number
  price: number
  no: string
  rejected_comment?: any
  rejected_options?: any
  created_at: string
  updated_at?: any
  client: Client
  equipment_quote_request: Equipmentquoterequest[]
  approved_by: Approvedby
}
interface Approvedby {
  id: number
  username: string
  password: string
  email: string
  createdAt: string
  notification_token?: any
}
interface Equipmentquoterequest {
  id: number
  name: string
  type_service: string
  count: number
  model: string
  measuring_range: string
  calibration_method: string
  additional_remarks: string
  discount: number
  status: string
  comment?: string
  price: number
  total: number
}
interface Client {
  id: number
  company_name: string
  phone: string
  address: string
  no_ruc: string
  email: string
  requested_by: string
  created_at: string
}
