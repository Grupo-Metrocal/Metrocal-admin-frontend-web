export interface IPendingActivities {
  id: number
  created_at: string
  updated_at: string
  responsable: number
  progress: number
  quoteRequest: QuoteRequest
  team_members: Teammember[]
}
interface Teammember {
  id: number
  username: string
  imageURL: string
}
interface QuoteRequest {
  id: number
  no: string
  client: Client
  equipment_quote_request: Equipmentquoterequest[]
}
interface Equipmentquoterequest {
  id: number
  name: string
  count: number
  type_service: string
  calibration_method: string
  total: number
  price: number
  method_id: number
}
interface Client {
  id: number
  company_name: string
  email: string
}
