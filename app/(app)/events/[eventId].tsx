import CText from "@/components/CText"
import EventGallery from "@/components/EventGallery"
import { EventProperty } from "@/components/EventProperty"
import Header from "@/components/Header"
import Layout from "@/components/Layout"
import ModalLayout from "@/components/ModalLayout"
import { sampleEvents } from "@/data/event"
import { AntDesign } from "@expo/vector-icons"
import { useState } from "react"
import { View, Pressable, Modal, SafeAreaView } from "react-native"

const EventDetails = () => {
    const event = sampleEvents[0];
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    return (
        <Layout header={<Header leftButton='back' rightButton='auth' />} topElement={<EventGallery hideLabels fullWidth event={event} onPress={() => { }} />}>
            {/* Name & date */}
            <View style={{ justifyContent: 'space-between', paddingBottom: 20 }}>
                <CText type='h1'>Three luxurious days in Northern Italy '25</CText>
            </View>
            {/* Venue */}
            <View style={{ justifyContent: 'space-between', paddingBottom: 5 }}>
                <CText type='h3'>{event.venue.name}, {event.venue.location.city}, {event.venue.location.country.code}</CText>
            </View>
            {/* Long description */}
            <Modal visible={isDescriptionExpanded} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setIsDescriptionExpanded(false)}>
                <ModalLayout onClose={() => setIsDescriptionExpanded(false)}>
                    <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                        <CText type='h2'>{event.name}</CText>
                    </View>
                    <View>
                        <CText type='normal'>{event.description.long}</CText>
                    </View>
                </ModalLayout>
            </Modal>
            <View style={{ paddingTop: 15, paddingBottom: 0 }}>
                <CText type='normal'>{event.description.short}</CText>
                <Pressable style={{}} onPress={() => setIsDescriptionExpanded(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <AntDesign name="right" size={12} color="black" style={{ marginBottom: -2 }} />
                        <CText type='bold'>more</CText>
                    </View>
                </Pressable>
            </View>
            {/* Line */}
            <View style={{ marginTop: 25, borderTopWidth: 1, borderTopColor: '#CCC' }}>

            </View>
            {/* Event Type */}
            <View style={{ marginVertical: 25, borderBottomWidth: 1, borderBottomColor: '#CCC', gap: 25, paddingTop: 5, paddingBottom: 30 }}>
                <EventProperty icon={'like2'} title={event.type === 'peer_reviewed' ? 'Peer Reviewed Guest List' : 'Open Guest List'} description={'Fugiat irure proident esse laboris culpa quis consequat incididunt consectetur. Voluptate adipisicing sit officia laborum exercitation. Sunt esse ea sint in cupidatat sint exercitation.'} />
                {event.properties.map((property) => (
                    <EventProperty key={property.title} icon={property.icon} title={property.title} description={property.description} />
                ))}
            </View>
        </Layout>
    )
}

export default EventDetails