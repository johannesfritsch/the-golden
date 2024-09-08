import ButtonBottomBar from '@/components/ButtonBottomBar'
import CText from '@/components/CText'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'
import nfcManager, { NfcTech } from 'react-native-nfc-manager'
import Rive, { Alignment, Fit } from 'rive-react-native'

const Login = () => {
    nfcManager.start();

    const handleScanPress = async () => {

        try {
            await nfcManager.requestTechnology(NfcTech.Ndef, {
                alertMessage: 'Please scan your NFC tag',
            });

            const tag = await nfcManager.getTag();

            router.navigate('/events');
        } catch (error) {

        } finally {
            await nfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <Layout header={<Header leftButton='none' rightButton='none' />} footer={<ButtonBottomBar caption='Login using NFC' onClick={handleScanPress} />}>
            <View style={{ paddingTop: 60 }}>
                <View style={{ marginBottom: 20 }}>
                    <CText type="h1" style={{ textAlign: 'center' }}>Scan your NFC chip</CText>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <CText type='normal' style={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sint id neque quibusdam.</CText>
                </View>
                <View style={{ marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Rive style={{ width: 200, height: 200 }} resourceName='scan-nfc-tag' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
                </View>
                <View style={{ marginTop: 40 }}>
                    <Pressable onPress={() => router.navigate('/modal')}>
                        <CText type="underline" style={{ textAlign: 'center' }}>I don't have a tag</CText>
                    </Pressable>
                </View>
            </View>
        </Layout>
    )
}

export default Login