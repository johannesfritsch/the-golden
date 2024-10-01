import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import CText from "./CText"
import { Feather } from "@expo/vector-icons"
import * as Haptics from 'expo-haptics'

export type ButtonProps = {
    caption: string
    type?: 'primary' | 'secondary'
    disabled?: boolean
    onClick: () => void
    style?: StyleProp<ViewStyle>
    chevron?: boolean
}

const Button = ({ type = 'primary', caption, onClick, disabled = false, style: additionalStyle, chevron = false }: ButtonProps) => {
    const buttonStyle = {
        flexShrink: 1,
        backgroundColor: type === 'primary' ? '#B29146' : undefined,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderTopStartRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
    };

    const captionStyle = {
        textAlign: 'center' as const,
        color: type === 'primary' ? 'white' : '#B29146' as const,
        fontSize: 18,
        opacity: disabled ? 0.5 : 1.0
    };


    const handleClick = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onClick();
    };
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable onPress={!disabled ? handleClick : () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)} style={[buttonStyle, additionalStyle]}>
                <CText type='bold' style={captionStyle}>{caption}</CText>
                {type === 'primary' && chevron && <Feather name='chevron-right' size={20} color='white' style={{ marginTop: 1, marginLeft: 2, opacity: disabled ? 0.5 : 1.0 }} />}
            </Pressable>
        </View>
    )
}

export default Button