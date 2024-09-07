import EventCard from "@/components/EventCard";
import Layout from "@/components/Layout";
import { sampleEvents } from "@/data/event";

const EventList = () => {
    return (
        <Layout header={{ leftButton: 'menu', rightButton: 'auth' }}>
            {sampleEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </Layout>
    );
}

export default EventList;