const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return 'th'
    switch (day % 10) 
    {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
    }
}

// Format the date and time of an event
export const formatEventDate = (eventDateTime: string): { date: string; time: string } => 
{
    const eventDate = new Date(eventDateTime)
    
    // Format time (HH:MM)
    const timeFormatter = new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: 'numeric'
    })
    const time = timeFormatter.format(eventDate)
    
    // Format date (Month DDth)
    const day = eventDate.getDate()
    const month = eventDate.toLocaleString('en', { month: 'long' })
    const date = `${month} ${day}${getDaySuffix(day)}`
    
    return { date, time }
} 