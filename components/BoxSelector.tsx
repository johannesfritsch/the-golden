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
                <View style={{ flexGrow: 1 }}>
                    <Pressable key={value} onPress={() => onValueChange(value)} style={{
                        height: 45,
                        borderWidth: 1,
                        borderColor: '#666',
                        borderRadius: 15,
                        paddingHorizontal: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: value === currentValue ? '#666' : 'white',
                    }}>
                        <CText type='normal' style={{
                            fontSize: 16,
                            lineHeight: 21,
                            fontFamily: 'RobotoRegular',
                            color: value === currentValue ? '#FFF' : '#666',
                        }}>{label}</CText>
                    </Pressable>
                </View>
            ))}
        </View>
    )
}

export default BoxSelector