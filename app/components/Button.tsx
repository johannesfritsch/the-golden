import { Pressable, StyleProp, ViewStyle } from "react-native"
import CText from "./CText"
import { Feather } from "@expo/vector-icons"

export type ButtonProps = {
    caption: string
    type?: 'primary' | 'secondary'
    disabled?: boolean
    onClick: () => void
    style?: StyleProp<ViewStyle>
    chevron?: boolean
}

const Button = ({ type = 'primary', caption, onClick, disabled = false, style: additionalStyle, chevron = false }: ButtonProps) => {
    return (
        <Pressable onPress={!disabled ? onClick : () => { }} style={[{ backgroundColor: type === 'primary' ? '#B29146' : '#666', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', width: '100%' }, additionalStyle]}>
            <CText type='bold' style={{ textAlign: 'center', color: 'white', fontSize: 18, opacity: disabled ? 0.5 : 1.0 }}>{caption}</CText>
            {chevron && <Feather name='chevron-right' size={20} color='white' style={{ marginTop: 1, marginLeft: 2 }} />}
        </Pressable>
    )
}

export default Button