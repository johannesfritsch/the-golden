import CText from "@/components/CText";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import TabBar from "@/components/TabBar";
import { trpc } from "@/utils/trpc";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { AppState, View } from "react-native";

const EventList = () => {
    const { data, error, isFetching, refetch } = trpc.getEvents.useQuery();

    useFocusEffect(
        useCallback(() => {
            console.log('EventList focused');
            refetch();
        }, [])
    );

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                refetch();
            }
            appState.current = nextAppState;
        });
        return () => subscription.remove();
    }, []);

    return (
        <Layout topElement={<Header leftButton='menu' rightButton='auth' />} bottomElement={<TabBar />} loading={!!error || isFetching} refetch={refetch}>
            {data && data.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </Layout>
    );
}

export default EventList;