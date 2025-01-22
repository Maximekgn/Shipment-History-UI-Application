"use client"
import { useState } from 'react'
import { useShipments } from '@/hooks/shipment/useShipments'
import { ProcessedShipment } from '@/hooks/shipment/types'
import { ShipmentDateGroup } from './ShipmentDateGroup'

interface ShipmentHistoryProps {
  shipmentId: 'ship1' | 'ship2' | 'ship3'
}

export default function ShipmentHistory({ shipmentId }: ShipmentHistoryProps) {
  const [expandedComments, setExpandedComments] = useState<number[]>([])
  const { [shipmentId]: steps } = useShipments()

  const toggleComment = (index: number) => {
    setExpandedComments(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const groupedSteps = steps.reduce((acc, step) => {
    if (!acc[step.date]) {
      acc[step.date] = []
    }
    acc[step.date].push(step)
    return acc
  }, {} as Record<string, ProcessedShipment[]>)

  // Sort steps within each date group by time (descending)
  Object.keys(groupedSteps).forEach(date => {
    groupedSteps[date].sort((a, b) => {
      const timeA = new Date(`2000/01/01 ${a.time}`).getTime()
      const timeB = new Date(`2000/01/01 ${b.time}`).getTime()
      return timeB - timeA
    })
  })

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Shipment history</h2>
      <div className="relative">
        {Object.entries(groupedSteps).map(([date, dateSteps], groupIndex) => (
          <ShipmentDateGroup
            key={date}
            date={date}
            steps={dateSteps}
            isLastGroup={groupIndex === Object.entries(groupedSteps).length - 1}
            expandedComments={expandedComments}
            onToggleComment={toggleComment}
          />
        ))}
      </div>
    </div>
  )
} 