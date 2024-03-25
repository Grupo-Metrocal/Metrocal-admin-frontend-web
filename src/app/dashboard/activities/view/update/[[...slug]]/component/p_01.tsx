'use client'
import { IP_01 } from '@/app/dashboard/certificates/interface/p-01'
export const P_01 = ({ equipment }: { equipment: IP_01 }) => {
  console.log(equipment)
  return (
    <div>
      <h1>Page P_01</h1>
    </div>
  )
}
