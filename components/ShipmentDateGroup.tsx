import { ShipmentStep as ShipmentStepType } from './types'
import { ShipmentStep } from './ShipmentStep'

interface ShipmentDateGroupProps {
  date: string
  steps: ShipmentStepType[]
  isLastGroup: boolean
  expandedComments: number[]
  onToggleComment: (index: number) => void
}

export function ShipmentDateGroup(props: ShipmentDateGroupProps) {
  const { date, steps, isLastGroup, expandedComments, onToggleComment } = props

  return (
    <div className="mb-6 sm:mb-8">
      {steps.map((step, index) => {
        // Check if we should show the date header
        const shouldShowDate = index === 0 || step.date !== steps[index - 1]?.date
        
        // Check if this is the final step
        const isFinalStep = isLastGroup && index === steps.length - 1

        return (
          <ShipmentStep
            key={`${date}-${index}`}
            step={step}
            isLastStep={isFinalStep}
            showDate={shouldShowDate}
            stepIndex={index}
            expandedComments={expandedComments}
            onToggleComment={onToggleComment}
          />
        )
      })}
    </div>
  )
}