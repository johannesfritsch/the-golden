import ButtonBottomBar from '@/components/ButtonBottomBar'
import CText from '@/components/CText'
import Layout from '@/components/Layout'
import { router } from 'expo-router'
import { Dimensions, Pressable, View } from 'react-native'
import nfcManager, { NfcTech } from 'react-native-nfc-manager'
import { Image } from 'expo-image'
import Header from '@/components/Header'
import Ntag424 from 'react-native-ntag-424'

const Login = () => {
    const deviceWidth = Dimensions.get('window').width;

    const handleScanPress = async () => {
        const ntag424 = new Ntag424(nfcManager);

        // begin NFC scan
        await ntag424.initiate();

        // select application/DF level
        await ntag424.selectFile('application');

        // authenticate into key slot #0 using the default key (16 zero bytes)
        await ntag424.authenticateEv2First(0, Buffer.alloc(16));

        // retrieve card UID
        const uid = await ntag424.getCardUid();
        console.log('uid', uid);

        // end NFC scan
        await ntag424.terminate();

        router.navigate('/events');

        // try {
        //     await nfcManager.start();

        //     await nfcManager.requestTechnology(NfcTech.Ndef, {
        //         alertMessage: 'Please scan your Aura bracelet,\nnecklace, or ring now.',
        //     });

        //     await nfcManager.getTag();

        //     router.navigate('/events');
        // } catch (error) {

        // } finally {
        //     await nfcManager.cancelTechnologyRequest();
        // }
    }

    return (
        <Layout style={{ backgroundColor: '#B29146' }} topElement={<Header leftButton='back' rightButton='none' />} bottomElement={<ButtonBottomBar caption='Login using Aura' onClick={handleScanPress} />}>
            <View style={{ marginBottom: 20, marginTop: 30 }}>
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