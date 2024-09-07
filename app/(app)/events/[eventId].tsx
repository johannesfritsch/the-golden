import CText from "@/components/CText"
import EventGallery from "@/components/EventGallery"
import Layout from "@/components/Layout"
import { sampleEvents } from "@/data/event"
import { AntDesign, Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import { useState } from "react"
import { View, Text, Pressable } from "react-native"

const EventDetails = () => {
    const event = sampleEvents[0];
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    return (
        <Layout header={{ leftButton: 'back', rightButton: 'auth' }} showTabBar={false} topElement={<EventGallery hideLabels fullWidth event={event} onPress={() => { }} />}>
            {/* Name & date */}
            <View style={{ justifyContent: 'space-between', paddingBottom: 20 }}>
                <CText type='h1'>Three luxurious days in Northern Italy '25</CText>
            </View>
            {/* Venue */}
            <View style={{ justifyContent: 'space-between', paddingBottom: 5 }}>
                <CText type='h3'>{event.venue.name}, {event.venue.location.city}, {event.venue.location.country.code}</CText>
            </View>
            {/* Long description */}
            {!isDescriptionExpanded && <View style={{ paddingTop: 15, paddingBottom: 0, flexDirection: 'row' }}>
                <CText type='normal'>{event.description.short} </CText>
                <Pressable onPress={() => setIsDescriptionExpanded(true)}><CText type='underline'>more</CText></Pressable>
            </View>}
            {isDescriptionExpanded && <View style={{ paddingTop: 15, paddingBottom: 0 }}>
                <CText type='normal'>{event.description.long}</CText>
                <Pressable onPress={() => setIsDescriptionExpanded(false)}><CText type='underline'>less</CText></Pressable>
            </View>}
            {/* Line */}
            <View style={{ marginTop: 25, borderTopWidth: 1, borderTopColor: '#CCC' }}>

            </View>
            {/* Event Type */}
            <View style={{ justifyContent: 'space-between', gap: 20, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CCC', marginVertical: 15, paddingTop: 10, paddingBottom: 25 }}>
                <View style={{}}>
                    <AntDesign name="like2" size={35} color="#B49146" />
                </View>
                <View style={{ flexShrink: 1 }}>
                    <View style={{ marginBottom: 5 }}>
                    <CText type="h3">{event.type === 'peer_reviewed' ? 'Peer Reviewed Guest List' : 'Open Guest List'}</CText>
                    </View>
                    <View>
                    <CText type="normal">Nostrud eiusmod dolor tempor aute cillum ad sint amet minim. Nostrud non pariatur amet minim occaecat deserunt nulla anim voluptate. Dolor veniam excepteur magna ipsum laboris.</CText>
                    </View>
                </View>
            </View>
        </Layout>
    )
}

export default EventDetails