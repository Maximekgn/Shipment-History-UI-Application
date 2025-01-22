"use client"
import {
  BsCheckCircle as ClarityCheckCircleIcon,
  BsClock as ClarityClockIcon,
  BsExclamationTriangle as ClarityAlertTriangleIcon,
  BsTruck as ClarityTruckIcon,
  BsGeoAlt as ClarityMapMarkerIcon,
  BsShop as ClarityStorefrontIcon,
  BsAirplane as ClarityAirplaneIcon,
  BsWater as ClarityShipIcon,
  BsBox as ClarityBoxIcon,
} from 'react-icons/bs'
import { ProcessedShipment } from '@/hooks/shipment/types'

interface ShipmentStepIconProps {
  step: ProcessedShipment
}

export function ShipmentStepIcon({ step }: ShipmentStepIconProps) {
  const iconBaseClasses = "w-5 h-5 flex items-center justify-center rounded-full border-2 bg-white"
  const iconColor = "text-gray-700"
  
  if (step.title === "DELIVERED") {
    return (
      <div className={iconBaseClasses}>
        <ClarityCheckCircleIcon className={`w-3 h-3 ${iconColor}`} />
      </div>
    )
  }

  if (step.title.toLowerCase().includes("arrived")) {
    return (
      <div className={iconBaseClasses}>
        <ClarityMapMarkerIcon className={`w-3 h-3 ${iconColor}`} />
      </div>
    )
  }

  if (step.status === "completed") {
    const title = step.title.toLowerCase()
    if (title.includes('transit')) {
      return (
        <div className={iconBaseClasses}>
          <ClarityTruckIcon className={`w-3 h-3 ${iconColor}`} />
        </div>
      )
    }
    if (title.includes('warehouse') || title.includes('facility')) {
      return (
        <div className={iconBaseClasses}>
          <ClarityStorefrontIcon className={`w-3 h-3 ${iconColor}`} />
        </div>
      )
    }
    if (title.includes('air')) {
      return (
        <div className={iconBaseClasses}>
          <ClarityAirplaneIcon className={`w-3 h-3 ${iconColor}`} />
        </div>
      )
    }
    if (title.includes('ship')) {
      return (
        <div className={iconBaseClasses}>
          <ClarityShipIcon className={`w-3 h-3 ${iconColor}`} />
        </div>
      )
    }
    if (title.includes('package')) {
      return (
        <div className={iconBaseClasses}>
          <ClarityBoxIcon className={`w-3 h-3 ${iconColor}`} />
        </div>
      )
    }
    return (
      <div className={iconBaseClasses}>
        <ClarityCheckCircleIcon className={`w-3 h-3 ${iconColor}`} />
      </div>
    )
  }
  
  if (step.status === "delayed") {
    return (
      <div className={iconBaseClasses}>
        <ClarityAlertTriangleIcon className={`w-3 h-3 ${iconColor}`} />
      </div>
    )
  }
  
  if (step.status === "current") {
    return <div className={iconBaseClasses} />
  }
  
  if (step.status === "scheduled") {
    return (
      <div className={iconBaseClasses}>
        <ClarityClockIcon className={`w-3 h-3 ${iconColor}`} />
      </div>
    )
  }

  if (step.status === "in_transit") {
    return (
      <div className={iconBaseClasses}>
        <ClarityTruckIcon className={`w-3 h-3 ${iconColor}`} />
      </div>
    )
  }
  
  return <div className={iconBaseClasses} />
} 