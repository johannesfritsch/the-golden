import EventCard from "@/components/EventCard";

const events = [{
    id: 1,
    name: 'Euridge Manor September \'24',
    startDate: '2025-06-01',
    endDate: '2025-06-03',
    location: 'Euridge Manor',
    images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
}, {
    id: 2,
    name: 'Birthday Party',
    startDate: '2025-07-01',
    endDate: '2025-07-03',
    location: 'Euridge Manor',
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
}, {
    id: 3,
    name: 'Birthday Party',
    startDate: '2025-08-01',
    endDate: '2025-08-03',
    location: 'Euridge Manor',
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
}];

const EventList = () => {
    return events.map(event => (
        <EventCard key={event.id} event={event} />
    ));
}

export default EventList;