import shipment1 from "@/data/shipment1.json"
import shipment2 from "@/data/shipment2.json"
import shipment3 from "@/data/shipment3.json"
import { ShipmentEvent, ProcessedShipment } from './types'
import { formatEventDate } from './dateUtils'
import { getShipmentStatus } from './useShipmentStatus'

// Function to process shipment events into a more usable format
const processShipment = (events: ShipmentEvent[]): ProcessedShipment[] => {
    // Sort events by date (from oldest to newest)
    const sortedEvents = events.sort((a, b) => 
        new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime()
    )

    // Map sorted events to the processed shipment format
    return sortedEvents.map(event => {
        const { date, time } = formatEventDate(event.eventDateTime) // Format the event date and time
        const status = getShipmentStatus(event) // Get the shipment status

        return {
            date,
            time,
            title: event.eventPosition.status, // Title of the event
            location: `${event.eventPosition.city}, ${event.eventPosition.country.toUpperCase()}`, // Location of the event
            description: event.eventPosition.comments, // Optional comments about the event
            status // Status of the shipment
        }
    })
}

// Custom hook to use shipments
export const useShipments = () => {
    const ship1 = processShipment(shipment1 as ShipmentEvent[]) 
    const ship2 = processShipment(shipment2 as ShipmentEvent[]) 
    const ship3 = processShipment(shipment3 as ShipmentEvent[]) 

    // Reverse the order to have the most recent events first
    return {
        ship1: ship1.reverse(),
        ship2: ship2.reverse(),
        ship3: ship3.reverse()
    }
} 