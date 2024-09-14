import { Pressable } from "react-native"
import CText from "./CText"

export type ButtonProps = {
    caption: string
    onClick: () => void
}

const Button = ({ caption, onClick }: ButtonProps) => {
    return (
        <Pressable onPress={onClick} style={{ backgroundColor: '#B29146', width: '100%', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20 }}>
            <CText type='bold' style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>{caption}</CText>
        </Pressable>
    )
}

export default Button