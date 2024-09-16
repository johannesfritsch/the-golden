import { Pressable, StyleProp, ViewStyle } from "react-native"
import CText from "./CText"

export type ButtonProps = {
    caption: string
    type?: 'primary' | 'secondary'
    onClick: () => void
    style?: StyleProp<ViewStyle>
}

const Button = ({ type = 'primary', caption, onClick, style: additionalStyle }: ButtonProps) => {
    return (
        <Pressable onPress={onClick} style={[{ backgroundColor: type === 'primary' ? '#B29146' : '#666666', width: '100%', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20 }, additionalStyle]}>
            <CText type='bold' style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>{caption}</CText>
        </Pressable>
    )
}

export default Button