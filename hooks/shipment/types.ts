export interface ShipmentEvent {
    eventDateTime: string
    eventPosition: {
        status: string
        city: string
        country: string
        comments?: string
    }
    shipment?: {
        satus?: {
            shipmentIsDelayed?: number
        }
        status?: {
            shipmentIsDelayed?: number
        }
    }
}

export interface ProcessedShipment {
    date: string
    time: string
    title: string
    location: string
    description?: string
    status: ShipmentStatus
}

export type ShipmentStatus = 
    | 'completed' 
    | 'current' 
    | 'delayed' 
    | 'pending' 
    | 'arrived' 
    | 'in_transit' 
    | 'scheduled' 