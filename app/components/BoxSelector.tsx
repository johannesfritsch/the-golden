import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import CText from "./CText"

export type BoxSelectorProps = {
    value: string | null
    items: Record<string, string>
    allowNull?: boolean
    onValueChange: (value: string) => void
    style?: StyleProp<ViewStyle>
}

const BoxSelector = ({ value: currentValue, items, allowNull, onValueChange, style }: BoxSelectorProps) => {
    return (
        <View style={[style, { flexDirection: 'row', gap: 10, flexWrap: "wrap" }]}>
            {Object.entries(items).map(([value, label]) => (
                <View key={value} style={{ flexGrow: 1 }}>
                    <Pressable onPress={() => onValueChange(value)} style={{
                        height: 45,
                        borderWidth: 1,
                        borderColor: value === currentValue ? '#333' : '#CCC',
                        borderRadius: 15,
                        paddingHorizontal: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: value === currentValue ? '#333' : 'white',
                    }}>
                        <CText type='normal' style={{
                            fontSize: 16,
                            lineHeight: 21,
                            fontFamily: 'RobotoRegular',
                            color: value === currentValue ? '#FFF' : '#333',
                        }}>{label}</CText>
                    </Pressable>
                </View>
            ))}
        </View>
    )
}

export default BoxSelector