import shipment1 from "@/data/shipment1.json"
import shipment2 from "@/data/shipment2.json"
import shipment3 from "@/data/shipment3.json"
import { ShipmentEvent, ProcessedShipment } from './types'
import { formatEventDate } from './dateUtils'
import { getShipmentStatus } from './useShipmentStatus'

const processShipment = (events: ShipmentEvent[]): ProcessedShipment[] => {
    // Trier par date (du plus ancien au plus récent)
    const sortedEvents = events.sort((a, b) => 
        new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime()
    )

    return sortedEvents.map(event => {
        const { date, time } = formatEventDate(event.eventDateTime)
        const status = getShipmentStatus(event)

        return {
            date,
            time,
            title: event.eventPosition.status,
            location: `${event.eventPosition.city}, ${event.eventPosition.country.toUpperCase()}`,
            description: event.eventPosition.comments,
            status
        }
    })
}

export const useShipments = () => {
    const ship1 = processShipment(shipment1 as ShipmentEvent[])
    const ship2 = processShipment(shipment2 as ShipmentEvent[])
    const ship3 = processShipment(shipment3 as ShipmentEvent[])

    // Inverser l'ordre pour avoir les plus récents en premier
    return {
        ship1: ship1.reverse(),
        ship2: ship2.reverse(),
        ship3: ship3.reverse()
    }
} 