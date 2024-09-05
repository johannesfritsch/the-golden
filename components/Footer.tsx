import { View } from 'react-native'
import Rive, { Alignment, Fit } from 'rive-react-native'

const Footer = () => {
  return (
    <View style={{ height: 110, justifyContent: 'center', alignItems: 'center' }}>
        <Rive style={{width: 100 }} resourceName='peeking-cat' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
    </View>
  )
}

export default Footer