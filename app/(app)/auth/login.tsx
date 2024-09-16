import ButtonBottomBar from '@/components/ButtonBottomBar'
import CText from '@/components/CText'
import Layout from '@/components/Layout'
import { router } from 'expo-router'
import { Dimensions, Pressable, View } from 'react-native'
import nfcManager, { NfcTech } from 'react-native-nfc-manager'
import Rive, { Alignment, Fit } from 'rive-react-native'
import { Image } from 'expo-image'
import Header from '@/components/Header'

const Login = () => {
    const deviceWidth = Dimensions.get('window').width;

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
        <Layout style={{ backgroundColor: '#B29146' }} topElement={<Header leftButton='back' rightButton='none' />} bottomElement={<ButtonBottomBar caption='Login using Aura' onClick={handleScanPress} />}>
            <View style={{ marginBottom: 20 }}>
                <CText type="h1" style={{ textAlign: 'center' }}>Scan your Aura</CText>
            </View>
            <View style={{ marginBottom: 40 }}>
                <CText type='normal' style={{ textAlign: 'center' }}>To log in, simply wear your Aura bracelet, necklace, or ring, and hold it near your device. The Aura seamlessly authenticates your identity.</CText>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Image source={require('../../../assets/images/bracelet.png')} style={{ borderColor: '#CCC', borderWidth: 1, width: deviceWidth * 0.8, height: deviceWidth * 0.8, borderRadius: deviceWidth * 0.8 / 2, alignSelf: 'center' }} />
            </View>
            <View style={{ marginBottom: 20 }}>
                <Pressable onPress={() => router.replace('/waitlist')}><CText type="boldunderline" style={{ textAlign: 'center' }}>I don't have an Aura yet</CText></Pressable>
            </View>
            {__DEV__ && (<View style={{ marginBottom: 40 }}>
                <Pressable onPress={() => router.navigate('/events')}><CText type="boldunderline" style={{ textAlign: 'center' }}>Debug: Skip login</CText></Pressable>
            </View>)}

        </Layout>
    )
}

export default Login