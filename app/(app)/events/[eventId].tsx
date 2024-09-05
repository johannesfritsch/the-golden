import { Link } from "expo-router"
import { View, Text } from "react-native"

const EventDetails = () => {
    return (
        <View style={{paddingTop: 100}}><Link href={'/events'}>Back</Link></View>
    )
}

export default EventDetails