import CText from "@/components/CText";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import TabBar from "@/components/TabBar";
import { sampleEvents } from "@/data/event";
import { trpc } from "@/utils/trpc";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { RefreshControl } from "react-native";

const EventList = () => {
    const { data, error, isFetching, refetch, failureReason, ...rest } = trpc.getEvents.useQuery();

    useFocusEffect(
        useCallback(() => {
            console.log('EventList focused');
            refetch();
        }, [])
    );

    return (
        <Layout topElement={<Header leftButton='menu' rightButton='auth' />} bottomElement={<TabBar />} loading={!!error || isFetching} refetch={refetch}>
            {sampleEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </Layout>
    );
}

export default EventList;