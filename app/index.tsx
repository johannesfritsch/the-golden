import { Image } from 'expo-image';
import { View, Text } from 'react-native';
import nfcManager, { NfcTech } from 'react-native-nfc-manager';
import Rive, { Alignment, Fit } from 'rive-react-native';
import { Dimensions } from 'react-native';
import { Redirect, router } from 'expo-router';

export default function LoginPage() {
    return <Redirect href={'/events'} />;
    
    // nfcManager.start();

    // return (
    //     <View style={{ backgroundColor: '#100E0F', display: 'flex', flexDirection: 'column', height: '100%' }}>
    //         <View style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //             <Image
    //                 style={{ width: Dimensions.get('window').width - 40, height: Dimensions.get('window').width * 0.8671875 }}
    //                 source={require('../assets/images/bracelet.jpeg')}
    //                 contentFit="contain"
    //                 transition={1000}
    //             />
    //         </View>
    //         <View style={{ height: 100, marginBottom: 50 }}>
    //             <Rive resourceName='tap-to-unlock' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} onRiveEventReceived={async () => {
    //                 await nfcManager.requestTechnology(NfcTech.Ndef);
    //                 try {
    //                     const tag = await nfcManager.getTag();
    //                     router.push('/events');
    //                     console.log(tag);
    //                 } catch (ex) {
    //                     console.warn(ex);
    //                 } finally {
    //                     await nfcManager.cancelTechnologyRequest();
    //                 }
    //             }} />
    //         </View>
    //     </View>
    // );
}