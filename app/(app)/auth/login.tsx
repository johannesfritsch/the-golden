import Layout from '@/components/Layout'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
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
        <Layout showTabBar={false} header={{ leftButton: 'none', rightButton: 'none' }}>
            <View style={{ paddingTop: 60 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>Scan your NFC chip</Text>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Text style={{ color: '#666', fontSize: 19, textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sint id neque quibusdam.</Text>
                </View>
                <View style={{ marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Rive style={{ width: 200, height: 200 }} resourceName='scan-nfc-tag' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={handleScanPress} style={{ backgroundColor: '#B29146', width: '50%', padding: 10, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Login using NFC</Text>
                    </Pressable>
                </View>
                <View style={{ marginTop: 40 }}>
                    <Pressable onPress={() => router.navigate('/events')}>
                        <Text style={{ color: '#B29146', textAlign: 'center' }}>I don't have a tag</Text>
                    </Pressable>
                </View>
            </View>
        </Layout>
    )
}

export default Login