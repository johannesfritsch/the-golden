import { Dimensions, View } from "react-native"
import Rive, { Alignment, Fit } from "rive-react-native"


const Header = () => {
  return (
    <View style={{ backgroundColor: '#FFCC81', height: 100, zIndex: 100 }}>
          <View style={{ position: 'absolute', bottom: -50, left: Dimensions.get('window').width / 2 - 50, width: 100, height: 100 }}>
            <Rive resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
          </View>
        </View>
  )
}

export default Header