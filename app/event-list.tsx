import EventCard from "@/components/EventCard";
import { Image } from "expo-image";
import { View, Text, Dimensions, ScrollView } from "react-native"
import Rive, { Alignment, Fit } from "rive-react-native";

const events = [{
    id: 1,
    name: 'Euridge Manor September \'24',
    date: '2022-06-01',
    location: 'Euridge Manor',
    images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
}, {
    id: 2,
    name: 'Birthday Party',
    date: '2022-06-01',
    location: 'Euridge Manor',
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
}, {
    id: 3,
    name: 'Birthday Party',
    date: '2022-06-01',
    location: 'Euridge Manor',
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: 'A beautiful wedding at Euridge Manor',
}];

const EventList = () => {
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ backgroundColor: '#FFCC81', height: 100, zIndex: 100 }}>
                {/* Logo */}
                <View style={{ position: 'absolute', bottom: -50, left: Dimensions.get('window').width / 2 - 50, width: 100, height: 100 }}>
                    <Rive resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
                </View>
            </View>
            <ScrollView style={{ backgroundColor: '#fff', flexGrow: 1, gap: 10, padding: 10 }}>
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </ScrollView>
            <View style={{ backgroundColor: '#DED8CB', height: 100 }}>
                <Text>Bottom</Text>
            </View>
        </View>
    )
}

export default EventList;