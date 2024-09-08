import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import TabBar from "@/components/TabBar";
import { sampleEvents } from "@/data/event";

const EventList = () => {
    return (
        <Layout header={<Header leftButton='menu' rightButton='auth' />} footer={<TabBar />}>
            {sampleEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </Layout>
    );
}

export default EventList;