import shipment1 from "@/data/shipment1.json"
import shipment2 from "@/data/shipment2.json"
import shipment3 from "@/data/shipment3.json"

interface ShipmentEvent {
    eventDateTime: string
    eventPosition: {
        status: string
        city: string
        country: string
        comments?: string
    }
    shipment?: {
        status?: {
            shipmentIsDelayed?: number
        }
        satus?: {
            shipmentIsDelayed?: number
        }
    }
}

interface Shipment {
    date: string
    time: string
    title: string
    location: string
    description?: string
    status: 'completed' | 'current' | 'delayed' | 'pending' | 'arrived' | 'in_transit' | 'scheduled'
}

export const getShipments = () => {
    const processShipment = (events: ShipmentEvent[]): Shipment[] => {
        // Sort in ascending order (oldest first)
        const sortedEvents = events.sort((a, b) => 
            new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime()
        )

        return sortedEvents.map(event => {
            let status: 'completed' | 'current' | 'delayed' | 'pending' | 'arrived' | 'in_transit' | 'scheduled' = 'completed'
            
            const isDelayed = event.shipment?.satus?.shipmentIsDelayed === 1 || 
                             event.shipment?.status?.shipmentIsDelayed === 1
            
            const eventStatus = event.eventPosition.status.toLowerCase()
            
            if (eventStatus.includes('delivered')) {
                status = 'completed'
            } else if (eventStatus.includes('out for delivery')) {
                status = 'current'
            } else if (eventStatus.includes('arrived')) {
                status = 'arrived'
            } else if (eventStatus.includes('in transit')) {
                status = 'in_transit'
            } else if (eventStatus.includes('schedule')) {
                status = 'scheduled'
            } else {
                status = isDelayed ? 'delayed' : 'pending'
            }

            const eventDate = new Date(event.eventDateTime)
            const timeFormatter = new Intl.DateTimeFormat('en', {
                hour: 'numeric',
                minute: 'numeric'
            })
            
            const day = eventDate.getDate()
            const month = eventDate.toLocaleString('en', { month: 'long' })
            
            // Add appropriate suffix to day
            const suffix = (day: number): string => {
                if (day >= 11 && day <= 13) return 'th'
                switch (day % 10) {
                    case 1: return 'st'
                    case 2: return 'nd'
                    case 3: return 'rd'
                    default: return 'th'
                }
            }
            
            const date = `${month} ${day}${suffix(day)}`
            const time = timeFormatter.format(eventDate)

            return {
                date,
                time,
                title: event.eventPosition.status,
                location: `${event.eventPosition.city}, ${event.eventPosition.country.toUpperCase()}`,
                description: event.eventPosition.comments || undefined,
                status
            }
        })
    }

    const ship1 = processShipment(shipment1)
    const ship2 = processShipment(shipment2) 
    const ship3 = processShipment(shipment3)

    return { ship1: ship1.reverse(), ship2: ship2.reverse(), ship3: ship3.reverse() }
}