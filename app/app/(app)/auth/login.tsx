import ButtonBottomBar from '@/components/ButtonBottomBar'
import CText from '@/components/CText'
import Layout from '@/components/Layout'
import { router } from 'expo-router'
import { Dimensions, Pressable, View } from 'react-native'
import nfcManager from 'react-native-nfc-manager'
import { Image } from 'expo-image'
import Header from '@/components/Header'
import { NfcAuth } from '@/utils/nfc'
import { Buffer } from 'buffer';
import { trpc } from '@/utils/trpc'


const Login = () => {
    const deviceWidth = Dimensions.get('window').width;
    const { mutateAsync: loginWithNfcPartOneAsync } = trpc.loginWithNfcPartOne.useMutation();
    const { mutateAsync: loginWithNfcPartTwoAsync } = trpc.loginWithNfcPartTwo.useMutation();

    const handleScanPress = async () => {
        const authenticator = new NfcAuth(nfcManager);

        try {
            await authenticator.initiate();
            await authenticator.selectApplicationFile();

            const randBEncrypted = await authenticator.authenticateEv2FirstPartOne(0);

            const serverResponse = await loginWithNfcPartOneAsync({ cardUid: Buffer.from('0123456789ABCD', 'hex').toString('hex'), bytes: Buffer.from(randBEncrypted).toString('hex') });

            const partTwoEncrypted = await authenticator.authenticateEv2FirstPartTwo(Array.from(new Uint8Array(Buffer.from(serverResponse.result, 'hex'))));
            const serverResponse2 = await loginWithNfcPartTwoAsync({ cardUid: Buffer.from('0123456789ABCD', 'hex').toString('hex'), bytes: Buffer.from(partTwoEncrypted).toString('hex') });
            console.log('------> serverResponse2.token', serverResponse2.token);
        } catch (error) {

        } finally {
            await authenticator.terminate();
        }
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