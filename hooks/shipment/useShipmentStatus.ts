import { ShipmentEvent, ShipmentStatus } from './types'

export const getShipmentStatus = (event: ShipmentEvent): ShipmentStatus => {
    const isDelayed = event.shipment?.satus?.shipmentIsDelayed === 1
    const eventStatus = event.eventPosition.status.toLowerCase()
    
    if (isDelayed || eventStatus.includes('delayed')) {
        return 'delayed'
    }
    
    if (eventStatus.includes('delivered')) {
        return 'completed'
    }
    
    if (eventStatus.includes('out for delivery')) {
        return 'current'
    }
    
    if (eventStatus.includes('arrived')) {
        return 'arrived'
    }
    
    if (eventStatus.includes('in transit')) {
        return 'in_transit'
    }
    
    if (eventStatus.includes('schedule')) {
        return 'scheduled'
    }
    
    return 'pending'
} 