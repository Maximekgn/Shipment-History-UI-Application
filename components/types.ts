export interface ShipmentStep {
  date: string
  time: string
  title: string
  location: string
  description?: string
  status: 'completed' | 'current' | 'delayed' | 'pending' | 'arrived' | 'in_transit' | 'scheduled'
  shipmentIsDelayed?: boolean
  shipmentException?: boolean
}

export interface ShipmentHistoryProps {
  steps: ShipmentStep[]
} 