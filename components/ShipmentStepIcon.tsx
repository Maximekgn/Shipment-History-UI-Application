import {
  BsCheckCircle,
  BsClock,
  BsExclamationTriangle,
  BsTruck,
  BsGeoAlt,
  BsShop,
  BsAirplane,
  BsWater,
  BsBox
} from 'react-icons/bs'
import { ProcessedShipment } from '@/hooks/shipment/types'

interface ShipmentStepIconProps {
  step: ProcessedShipment
}

export function ShipmentStepIcon({ step }: ShipmentStepIconProps) {
  const iconBaseClasses = "w-5 h-5 flex items-center justify-center rounded-full border-2 bg-white"
  const iconClasses = "w-3 h-3 text-gray-700"

  const getIconByTitle = (title: string) => {
    const lowerTitle = title.toLowerCase()
    
    if (title === "DELIVERED") return BsCheckCircle
    if (lowerTitle.includes("arrived")) return BsGeoAlt
    if (lowerTitle.includes("transit")) return BsTruck
    if (lowerTitle.includes("warehouse") || lowerTitle.includes("facility")) return BsShop
    if (lowerTitle.includes("air")) return BsAirplane
    if (lowerTitle.includes("ship")) return BsWater
    if (lowerTitle.includes("package")) return BsBox
    return BsCheckCircle
  }

  const getIconByStatus = (status: string) => {
    switch (status) {
      case "delayed":
        return BsExclamationTriangle
      case "scheduled":
        return BsClock
      case "in_transit":
        return BsTruck
      default:
        return null
    }
  }

  const Icon = step.status === "completed" 
    ? getIconByTitle(step.title)
    : getIconByStatus(step.status)

  return (
    <div className={iconBaseClasses}>
      {Icon && <Icon className={iconClasses} />}
    </div>
  )
}