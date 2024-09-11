import { AntDesign } from "@expo/vector-icons"
import { View } from "react-native"
import CText from "./CText"

export type EventPropertyProps = {
    icon: string,
    title: string,
    description: string
}

export const EventProperty = ({ icon, title, description }: EventPropertyProps) => {
    return (
        <View key={title} style={{ justifyContent: 'space-between', gap: 30, flexDirection: 'row' }}>
            <View style={{}}>
                <AntDesign name={icon as any} size={35} color="#B49146" />
            </View>
            <View style={{ flexShrink: 1 }}>
                <View style={{ marginBottom: 5 }}>
                    <CText type="h3">{title}</CText>
                </View>
                <View>
                    <CText type="normal">{description}</CText>
                </View>
            </View>
        </View>
    )
}