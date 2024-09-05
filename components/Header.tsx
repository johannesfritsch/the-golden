import { Feather } from "@expo/vector-icons"
import { Dimensions, View, Text } from "react-native"
import Rive, { Alignment, Fit } from "rive-react-native"


const Header = () => {
    return (
        <View style={{ backgroundColor: '#B29146', height: 100, zIndex: 100 }}>
            <View style={{ position: 'absolute', left: 0, width: 70, height: 50, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Feather name="menu" size={30} color="white" />
            </View>
            <View style={{ position: 'absolute', right: 0, width: 70, height: 50, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Feather name="user" size={30} color="white" />
            </View>
            <View style={{ position: 'absolute', bottom: -50, left: Dimensions.get('window').width / 2 - 50, width: 100, height: 100 }}>
                <Rive resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
            </View>
        </View>
    )
}

export default Header