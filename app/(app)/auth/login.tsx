import ButtonBottomBar from '@/components/ButtonBottomBar'
import CText from '@/components/CText'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'
import nfcManager, { NfcTech } from 'react-native-nfc-manager'
import Rive, { Alignment, Fit } from 'rive-react-native'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Login = () => {
    nfcManager.start();

    const handleScanPress = async () => {

        try {
            await nfcManager.requestTechnology(NfcTech.Ndef, {
                alertMessage: 'Please scan your Aura bracelet,\nnecklace, or ring now.',
            });

            await nfcManager.getTag();

            router.navigate('/events');
        } catch (error) {

        } finally {
            await nfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <Layout style={{ backgroundColor: '#B29146' }} bottomElement={<ButtonBottomBar caption='Login using Aura' onClick={handleScanPress} />}>
            <View style={{  }}>
                <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <Rive style={{ width: 100, height: 100 }} resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <CText type="h1" style={{ textAlign: 'center' }}>Scan your Aura</CText>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <CText type='normal' style={{ textAlign: 'center' }}>To log in, simply wear your Aura bracelet, necklace, or ring, and hold it near your device. The Aura seamlessly authenticates your identity.</CText>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Image source={require('../../../assets/images/bracelet.png')} style={{ borderColor: '#CCC', borderWidth: 1, width: 350, height: 350, borderRadius: 350 / 2, alignSelf: 'center' }} />
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Pressable onPress={() => router.navigate('/info/productInfo')}><CText type="underline" style={{ textAlign: 'center' }}>I don't have an Aura yet</CText></Pressable>
                </View>
            </View>
        </Layout>
    )
}

export default Login