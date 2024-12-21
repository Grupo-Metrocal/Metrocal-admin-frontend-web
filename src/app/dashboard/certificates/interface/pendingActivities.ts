export interface IRoot {
  statistics: IStatistics
  activities: IPendingActivities[]
}

export interface IStatistics {
  certificates: {
    currentMonth: number
    comparePreviousMonth: number
  }
  income: {
    currentMonth: number
    comparePreviousMonth: number
  }
  pendingCertification: number
}
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
  email: string
}
interface QuoteRequest {
  id: number
  no: string
  price: number
  client: Client
  equipment_quote_request: Equipmentquoterequest[]
}
export interface Equipmentquoterequest {
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
