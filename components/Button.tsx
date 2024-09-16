import { Pressable, StyleProp, ViewStyle } from "react-native"
import CText from "./CText"

export type ButtonProps = {
    caption: string
    type?: 'primary' | 'secondary'
    disabled?: boolean
    onClick: () => void
    style?: StyleProp<ViewStyle>
}

const Button = ({ type = 'primary', caption, onClick, disabled = false, style: additionalStyle }: ButtonProps) => {
    return (
        <Pressable onPress={onClick} style={[{ backgroundColor: type === 'primary' ? '#B29146' : '#666', width: '100%', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20 }, additionalStyle]}>
            <CText type='bold' style={{ textAlign: 'center', color: 'white', fontSize: 16, opacity: disabled ? 0.5 : 1.0 }}>{caption}</CText>
        </Pressable>
    )
}

export default Button