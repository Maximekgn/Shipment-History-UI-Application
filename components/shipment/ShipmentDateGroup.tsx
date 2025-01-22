"use client"
import { ShipmentStep as ShipmentStepType } from './types'
import { ShipmentStep } from './ShipmentStep'

interface ShipmentDateGroupProps {
  date: string
  steps: ShipmentStepType[]
  isLastGroup: boolean
  expandedComments: number[]
  onToggleComment: (index: number) => void
}

export function ShipmentDateGroup({ 
  date, 
  steps, 
  isLastGroup, 
  expandedComments, 
  onToggleComment 
}: ShipmentDateGroupProps) {
  return (
    <div className="mb-6 sm:mb-8">
      {steps.map((step, stepIndex) => {
        const previousStep = stepIndex > 0 ? steps[stepIndex - 1] : null
        const showDate = stepIndex === 0 || step.date !== previousStep?.date
        const isLastStep = isLastGroup && stepIndex === steps.length - 1
        
        return (
          <ShipmentStep
            key={`${date}-${stepIndex}`}
            step={step}
            isLastStep={isLastStep}
            showDate={showDate}
            stepIndex={stepIndex}
            expandedComments={expandedComments}
            onToggleComment={onToggleComment}
          />
        )
      })}
    </div>
  )
} 