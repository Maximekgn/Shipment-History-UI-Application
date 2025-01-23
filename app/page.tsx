"use client"
import ShipmentHistory from "@/components/ShipmentHistory"
import { useShipments } from "@/hooks/shipment/useShipments"
import { useState } from "react"

export default function Page() {
  const [selectedShipment, setSelectedShipment] = useState<"ship1" | "ship2" | "ship3">("ship1")
  const {ship1, ship2, ship3} = useShipments()
  
  const shipmentMap = {
    "ship1": ship1,
    "ship2": ship2,
    "ship3": ship3
  }

  console.log(shipmentMap)

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6">
      <div className="mb-4">
        <select 
          value={selectedShipment}
          onChange={(e) => setSelectedShipment(e.target.value as "ship1" | "ship2" | "ship3")}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        >
          <option value="ship1">Shipment 1</option>
          <option value="ship2">Shipment 2</option>
          <option value="ship3">Shipment 3</option>
        </select>
      </div>

      <ShipmentHistory shipmentId={selectedShipment} />
    </div>
  )
}
