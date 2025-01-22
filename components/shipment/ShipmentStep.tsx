"use client"
import { BsChevronDown as ClarityAngleIcon } from 'react-icons/bs'
import { cn } from "@/lib/utils"
import { ProcessedShipment } from '@/hooks/shipment/types'
import { ShipmentStepIcon } from './ShipmentStepIcon'

interface ShipmentStepProps {
  step: ProcessedShipment
  isLastStep: boolean
  showDate: boolean
  stepIndex: number
  expandedComments: number[]
  onToggleComment: (index: number) => void
}

export function ShipmentStep({ 
  step, 
  isLastStep, 
  showDate, 
  stepIndex, 
  expandedComments, 
  onToggleComment 
}: ShipmentStepProps) {
  const getLineColor = (step: ProcessedShipment) => {
    if (step.status === "delayed") return "bg-yellow-400"
    if (step.status === "completed") return "bg-green-500"
    if (step.status === "current") return "bg-sky-500"
    if (step.status === "in_transit") return "bg-sky-500"
    return "bg-sky-500"
  }

  return (
    <div className="grid grid-cols-[140px_auto_1fr] xs:grid-cols-[180px_auto_1fr] sm:grid-cols-[220px_auto_1fr] gap-2 xs:gap-3 sm:gap-4 pb-6 sm:pb-8 relative last:pb-0">
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
          <ShipmentStepIcon step={step} />
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
                  onClick={() => onToggleComment(stepIndex)}
                  className="text-xs sm:text-sm text-sky-700 mt-1 flex items-center"
                >
                  View All <ClarityAngleIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </button>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">{step.description}</p>
                {step.description.split('\n').length > 3 && (
                  <button 
                    onClick={() => onToggleComment(stepIndex)}
                    className="text-xs sm:text-sm text-sky-700 mt-1 flex items-center"
                  >
                    View Less <ClarityAngleIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 