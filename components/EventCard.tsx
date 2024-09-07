import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router';
import { format } from 'date-fns'
import EventGallery from './EventGallery';
import { Event } from '@/data/event';
import CText from './CText';

export type EventCardProps = {
    event: Event
}

const EventCard = ({ event }: EventCardProps) => {
    return (
        <View key={event.id} style={{ paddingBottom: 10, marginBottom: 15 }}>
            <EventGallery event={event} onPress={() => router.navigate(`/events/${event.id}`)} />
            <Pressable onPress={() => router.navigate(`/events/${event.id}`)} style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                    <CText type="h3">{event.name}</CText>
                    <CText type="normal">{format(Date.parse(event.windowStart), 'MMM yyyy')}</CText>
                </View>
                <CText type="normal">{event.venue.name} | {event.venue.location.city} | {event.venue.location.country.code}</CText>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: 5 }}>
                    <CText type="h3">{event.minPrice.currencySymbol} {event.minPrice.value}</CText>
                    <CText type="h3"> | {event.days.min} days</CText>
                </View>
            </Pressable>

        </View>
    )
}

export default EventCard