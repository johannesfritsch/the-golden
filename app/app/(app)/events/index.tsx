import CText from "@/components/CText";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import TabBar from "@/components/TabBar";
import { sampleEvents } from "@/data/event";
import { trpc } from "@/utils/trpc";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const EventList = () => {
    const { error, data, refetch } = trpc.getEvents.useQuery();

    useFocusEffect(
        useCallback(() => {
            console.log('EventList focused');
            refetch();
        }, [])
    );

    return (
        <Layout topElement={<Header leftButton='menu' rightButton='auth' />} bottomElement={<TabBar />}>
            <CText type="normal" style={{ textAlign: 'center', marginTop: 30 }}>{error?.message}</CText>
            <CText type="normal" style={{ textAlign: 'center', marginTop: 40, marginBottom: 20 }}>{JSON.stringify(data)}</CText>
            {sampleEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </Layout>
    );
}

export default EventList;