import ShipmentHistory from "@/components/ShipmentHistory"
import { getShipments } from "@/hooks/fetchdata"

export default async function Page() {
  const {ship2} = getShipments()
  const steps = ship2
  console.log(steps)

  return (

          <ShipmentHistory steps={steps} />

  )
}
