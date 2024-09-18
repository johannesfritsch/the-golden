import { Pressable } from 'react-native'
import BottomBar from './BottomBar'
import CText from './CText'
import Button from './Button'

export type ButtonBottomBarProps = {
    caption: string
    onClick: () => void
}

const ButtonBottomBar = ({ caption, onClick }: ButtonBottomBarProps) => {
    return (
        <BottomBar>
            <Button caption={caption} onClick={onClick} />
        </BottomBar>
    )
}

export default ButtonBottomBar