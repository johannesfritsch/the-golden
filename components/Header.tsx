import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"
import { Dimensions, View, Text, Pressable } from "react-native"
import Rive, { Alignment, Fit } from "rive-react-native"

export type HeaderProps = {
    leftButton: 'menu' | 'back' | 'none'
    rightButton: 'auth' | 'none'
}

const Header = ({ leftButton, rightButton }: HeaderProps) => {
    return (
        <View style={{ backgroundColor: '#B29146', height: 50, zIndex: 100 }}>
            <View style={{ position: 'absolute', left: 0, width: 70, height: 50, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>

                {leftButton === 'menu' && <Pressable><Feather name="menu" size={30} color="white" /></Pressable>}
                {leftButton === 'back' && <Pressable onPress={() => router.back()}><Feather name="chevron-left" size={30} color="white" /></Pressable>}
            </View>
            <View style={{ position: 'absolute', bottom: -50, left: Dimensions.get('window').width / 2 - 50, width: 100, height: 100 }}>
                <Rive onRiveEventReceived={() => router.navigate('/events')} resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
            </View>
            <View style={{ position: 'absolute', right: 0, width: 70, height: 50, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                {rightButton === 'auth' && <Pressable onPress={() => router.dismissAll()}><Feather name="user" size={30} color="white" /></Pressable>}
            </View>
        </View>
    )
}

export default Header