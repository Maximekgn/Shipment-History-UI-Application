import { ShipmentDateGroup } from './ShipmentDateGroup'
import { useShipments } from '@/hooks/shipment/useShipments'
import { ProcessedShipment } from '@/hooks/shipment/types'
import { useState } from 'react'

interface ShipmentHistoryProps {
  shipmentId: 'ship1' | 'ship2' | 'ship3'
}

export default function ShipmentHistory({ shipmentId }: ShipmentHistoryProps) {
  const { [shipmentId]: steps } = useShipments()
  const [expandedComments, setExpandedComments] = useState<number[]>([])

  // Toggle comment expansion
  const toggleComment = (index: number) => {
    setExpandedComments(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Group shipments by date
  const groupedSteps = steps.reduce((acc, step) => {
    const date = step.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(step)
    return acc
  }, {} as Record<string, ProcessedShipment[]>)

  // Sort steps by time within each date group
  for (const date in groupedSteps) {
    groupedSteps[date].sort((a, b) => {
      const timeA = new Date(`2000/01/01 ${a.time}`).getTime()
      const timeB = new Date(`2000/01/01 ${b.time}`).getTime()
      return timeB - timeA // Sort descending
    })
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Shipment history</h2>
      <div className="relative">
        {Object.entries(groupedSteps).map(([date, dateSteps], groupIndex) => (
          <ShipmentDateGroup
            key={date}
            date={date}
            steps={dateSteps}
            expandedComments={expandedComments}
            onToggleComment={toggleComment}
            isLastGroup={groupIndex === Object.entries(groupedSteps).length - 1}
          />
        ))}
      </div>
    </div>
  )
}