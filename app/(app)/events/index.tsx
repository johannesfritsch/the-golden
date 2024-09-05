import EventCard from "@/components/EventCard";

const events = [{
    id: 1,
    name: '3-day luxury in Northern Italy \'25',
    windowStart: '2025-06-01',
    windowEnd: '2025-06-10',
    days: 3,
    nights: 2,
    location: 'Euridge Manor',
    images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'Euridge Manor is a stunning venue in Cotswolds.',
    price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
}, {
    id: 2,
    name: 'Birthday Party',
    windowStart: '2025-07-01',
    windowEnd: '2025-07-10',
    days: 3,
    nights: 2,
    location: 'Euridge Manor',
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
    price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
}, {
    id: 3,
    name: 'Birthday Party',
    windowStart: '2025-08-01',
    windowEnd: '2025-08-10',
    days: 3,
    nights: 2,
    location: 'Euridge Manor',
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
    price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
}];

const EventList = () => {
    return events.map(event => (
        <EventCard key={event.id} event={event} />
    ));
}

export default EventList;