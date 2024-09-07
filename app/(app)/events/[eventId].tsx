import EventGallery from "@/components/EventGallery"
import Layout from "@/components/Layout"
import { sampleEvents } from "@/data/event"
import { AntDesign, Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import { View, Text } from "react-native"

const EventDetails = () => {
    const event = sampleEvents[0];

    return (
        <Layout header={{ leftButton: 'back', rightButton: 'auth' }} showTabBar={false} topElement={<EventGallery hideLabels fullWidth event={event} onPress={() => { }} />}>
            {/* Name & date */}
            <View style={{ justifyContent: 'space-between', paddingBottom: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Three luxurious days in Northern Italy '25</Text>
            </View>
            {/* Venue */}
            <View style={{ justifyContent: 'space-between', paddingBottom: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{event.venue.name}, {event.venue.location.city}, {event.venue.location.country.code}</Text>
            </View>
            {/* Long description */}
            <View style={{ justifyContent: 'space-between', paddingTop: 15, paddingBottom: 0 }}>
                <Text style={{ fontWeight: 'normal', color: '#666', fontSize: 13, lineHeight: 17, fontFamily: 'MontserratRegular' }}>{event.description.long}</Text>
            </View>
            {/* Line */}
            <View style={{ marginTop: 25, borderTopWidth: 1, borderTopColor: '#CCC' }}>

            </View>
            {/* Event Type */}
            <View style={{ justifyContent: 'space-between', gap: 20, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CCC', marginVertical: 15, paddingTop: 10, paddingBottom: 25 }}>
                <View style={{}}>
                    <AntDesign name="like2" size={35} color="#B49146" />
                </View>
                <View style={{ flexShrink: 1 }}>
                    <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{event.type === 'peer_reviewed' ? 'Peer Reviewed Guest List' : 'Open Guest List'}</Text>
                    <Text style={{ color: '#666', fontWeight: 'normal', fontSize: 13, lineHeight: 17, fontFamily: 'MontserratRegular' }}>Nostrud eiusmod dolor tempor aute cillum ad sint amet minim. Nostrud non pariatur amet minim occaecat deserunt nulla anim voluptate. Dolor veniam excepteur magna ipsum laboris.</Text>
                </View>
            </View>
        </Layout>
    )
}

export default EventDetails