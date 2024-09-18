import { View } from 'react-native'
import Rive, { Alignment, Fit } from 'rive-react-native'

const Footer = () => {
  return (
    <View style={{ height: 62, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Rive style={{width: 130, height: 62 }} resourceName='peeking-cat' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
    </View>
  )
}

export default Footer