"use client"
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  MapPin,
  Warehouse,
  Plane,
  Ship,
  Box,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { useState } from 'react'

interface ShipmentStep {
  date: string
  time: string
  title: string
  location: string
  description?: string
  status: 'completed' | 'current' | 'delayed' | 'pending' | 'arrived' | 'in_transit' | 'scheduled'
  shipmentIsDelayed?: boolean
  shipmentException?: boolean
}

interface ShipmentHistoryProps {
  steps: ShipmentStep[]
}

export default function ShipmentHistory({ steps }: ShipmentHistoryProps) {
  const [expandedComments, setExpandedComments] = useState<number[]>([])

  const toggleComment = (index: number) => {
    setExpandedComments(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const getStepIcon = (step: ShipmentStep) => {
    if (step.title === "DELIVERED") {
      return (
        <div className="rounded-full p-0.5">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      )
    }

    if (step.title.toLowerCase().includes("arrived")) {
      return (
        <div className="rounded-full p-0.5">
          <MapPin className="w-3 h-3 text-white" />
        </div>
      )
    }

    if (step.status === "completed") {
      const title = step.title.toLowerCase()
      if (title.includes('transit')) {
        return (
          <div className="rounded-full p-0.5">
            <Truck className="w-3 h-3 text-white" />
          </div>
        )
      }
      if (title.includes('warehouse') || title.includes('facility')) {
        return (
          <div className="rounded-full p-0.5">
            <Warehouse className="w-3 h-3 text-white" />
          </div>
        )
      }
      if (title.includes('air')) {
        return (
          <div className="rounded-full p-0.5">
            <Plane className="w-3 h-3 text-white" />
          </div>
        )
      }
      if (title.includes('ship')) {
        return (
          <div className="rounded-full p-0.5">
            <Ship className="w-3 h-3 text-white" />
          </div>
        )
      }
      if (title.includes('package')) {
        return (
          <div className="rounded-full p-0.5">
            <Box className="w-3 h-3 text-white" />
          </div>
        )
      }
      return (
        <div className="rounded-full p-0.5">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      )
    }
    
    if (step.status === "delayed" || step.shipmentIsDelayed) {
      return (
        <div className="rounded-full p-0.5">
          <AlertTriangle className="w-3 h-3 text-white" />
        </div>
      )
    }
    
    if (step.status === "current") {
      return (
        <div className="rounded-full p-0.5 w-5 h-5 flex items-center justify-center">
        </div>
      )
    }
    
    if (step.status === "scheduled") {
      return (
        <div className="rounded-full p-0.5">
          <Clock className="w-3 h-3 text-white" />
        </div>
      )
    }

    if (step.status === "in_transit") {
      return (
        <div className="rounded-full p-0.5">
          <Truck className="w-3 h-3 text-white" />
        </div>
      )
    }
    
    return (
      <div className="rounded-full p-0.5">
        <Clock className="w-3 h-3 text-white" />
      </div>
    )
  }

  const groupedSteps = steps.reduce((acc, step) => {
    if (!acc[step.date]) {
      acc[step.date] = []
    }
    acc[step.date].push(step)
    return acc
  }, {} as Record<string, ShipmentStep[]>)

  Object.keys(groupedSteps).forEach(date => {
    groupedSteps[date].sort((a, b) => {
      const timeA = new Date(`2000/01/01 ${a.time}`).getTime()
      const timeB = new Date(`2000/01/01 ${b.time}`).getTime()
      return timeB - timeA
    })
  })

  const getLineColor = (step: ShipmentStep) => {
    if (step.shipmentException) return "bg-red-500"
    if (step.shipmentIsDelayed) return "bg-yellow-400"
    if (step.status === "delayed") return "bg-yellow-400"
    if (step.status === "completed") return "bg-green-500"
    if (step.status === "current") return "bg-sky-500"
    if (step.status === "in_transit") return "bg-sky-500"
    return "bg-sky-500"
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Shipment history</h2>
      <div className="relative">
        {Object.entries(groupedSteps).map(([date, dateSteps], groupIndex) => (
          <div key={date} className="mb-6 sm:mb-8">
            {dateSteps.map((step, stepIndex) => {
              const previousStep = stepIndex > 0 ? dateSteps[stepIndex - 1] : null;
              const showDate = stepIndex === 0 || step.date !== previousStep?.date;
              const isLastStep = groupIndex === Object.entries(groupedSteps).length - 1 && stepIndex === dateSteps.length - 1;
              
              return (
                <div key={`${groupIndex}-${stepIndex}`} className="grid grid-cols-[140px_auto_1fr] xs:grid-cols-[180px_auto_1fr] sm:grid-cols-[220px_auto_1fr] gap-2 xs:gap-3 sm:gap-4 pb-6 sm:pb-8 relative last:pb-0">
                  <div className="whitespace-nowrap pt-0.5">
                    <div className="flex flex-col lg:flex-row lg:gap-2">
                      <span className={cn(
                        "text-xs sm:text-sm text-sky-700 w-[80px] xs:w-[90px] sm:w-[100px] flex-shrink-0",
                        !showDate && "invisible"
                      )}>{step.date}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">{step.time}</span>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center flex-shrink-0">
                    {!isLastStep && (
                      <div
                        className={cn(
                          "absolute top-5 h-full w-0.5 -translate-x-1/2",
                          getLineColor(step)
                        )}
                      />
                    )}
                    <div className={cn(
                      "relative z-10 rounded-full p-0.5",
                      getLineColor(step)
                    )}>
                      {getStepIcon(step)}
                    </div>
                  </div>
                  <div className="pt-0.5 min-w-0">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
                        <h3 className="font-bold text-[#1C355E] text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">{step.title}</h3>
                        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">{step.location}</span>
                      </div>
                    </div>
                    {step.description && (
                      <div className="mt-1 max-w-full">
                        {step.description.split('\n').length > 3 && !expandedComments.includes(stepIndex) ? (
                          <>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{step.description}</p>
                            <button 
                              onClick={() => toggleComment(stepIndex)}
                              className="text-xs sm:text-sm text-sky-700 mt-1 flex items-center"
                            >
                              View All <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="text-xs sm:text-sm text-muted-foreground break-words">{step.description}</p>
                            {step.description.split('\n').length > 3 && (
                              <button 
                                onClick={() => toggleComment(stepIndex)}
                                className="text-xs sm:text-sm text-sky-700 mt-1 flex items-center"
                              >
                                View Less <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}