import Button from '@/components/Button'
import CText from '@/components/CText'
import { NfcAuth } from '@/utils/nfc'
import { trpc } from '@/utils/trpc'
import { router, useFocusEffect } from 'expo-router'
import { AppState, Pressable, View } from 'react-native'
import nfcManager from 'react-native-nfc-manager'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { decrypt, crc32 } from 'react-native-ntag-424/src/services/crypto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Rive from 'rive-react-native'
import { useCallback, useEffect, useRef, useState } from 'react'

const Login = () => {
    const insets = useSafeAreaInsets();
    const { mutateAsync: loginWithNfcPartOneAsync } = trpc.loginWithNfcPartOne.useMutation();
    const { mutateAsync: loginWithNfcPartTwoAsync } = trpc.loginWithNfcPartTwo.useMutation();

    const appState = useRef(AppState.currentState);
    const [hasValidToken, setHasValidToken] = useState(false);
    const [hasValidPin, setHasValidPin] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                AsyncStorage.getItem('token').then(token => setHasValidToken(token !== null));
                AsyncStorage.getItem('pin').then(pin => setHasValidPin(pin !== null));
            }
            appState.current = nextAppState;
        });
        return () => subscription.remove();
    }, []);

    useFocusEffect(useCallback(() => {
        AsyncStorage.getItem('token').then(token => setHasValidToken(token !== null));
        AsyncStorage.getItem('pin').then(pin => setHasValidPin(pin !== null));
    }, []));

    const handleScanPress = async () => {
        const authenticator = new NfcAuth(nfcManager);

        try {
            await authenticator.initiate();
            await authenticator.selectApplicationFile();

            const cardUid = '12345678901234';

            const randBEncrypted = await authenticator.authenticateEv2FirstPartOne(0);
            console.log('------> randBEncrypted', randBEncrypted);
            const serverResponse = await loginWithNfcPartOneAsync({ cardUid: Buffer.from(cardUid, 'hex').toString('hex'), bytes: Buffer.from(randBEncrypted).toString('hex') });
            console.log('------> serverResponse.result', serverResponse.result);
            const partTwoEncrypted = await authenticator.authenticateEv2FirstPartTwo(Array.from(new Uint8Array(Buffer.from(serverResponse.result, 'hex'))));
            console.log('------> partTwoEncrypted', partTwoEncrypted);
            const serverResponse2 = await loginWithNfcPartTwoAsync({ cardUid: Buffer.from(cardUid, 'hex').toString('hex'), bytes: Buffer.from(partTwoEncrypted).toString('hex') });
            console.log('------> serverResponse2.token', serverResponse2.token);

            const decryptionKeyFromPin = crc32(Buffer.from('12345678', 'hex'));

            const decryptedToken = decrypt(Buffer.from(serverResponse2.token, 'hex'), Buffer.alloc(16), Buffer.concat([decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin]), 'aes-128-cbc');
            console.log('------> decryptedToken', decryptedToken.toString('utf8'));

            if (/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/.test(decryptedToken.toString('utf8').trim())) {
                await AsyncStorage.setItem('token', decryptedToken.toString('utf8'));
                router.back();
            } else {
                throw new Error('Invalid PIN');
            }

        } catch (error) {
            console.error(error);
        } finally {
            await authenticator.terminate();
        }
    }

    return (<>
        <View style={{ backgroundColor: 'white', paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <View style={{ marginTop: -100 }}>
                <CText style={{ textAlign: 'center', marginBottom: 10 }} type="normal">{JSON.stringify({ hasValidToken, hasValidPin })}</CText>
                <View style={{ height: 150, marginBottom: 20 }}>
                    <Rive resourceName='logo' style={{ width: 150, height: 150, alignSelf: 'center' }} />
                </View>
                <CText style={{ textAlign: 'center', marginBottom: 10 }} type="h1">Please login to continue</CText>
                <CText style={{ textAlign: 'center', marginBottom: 40, paddingHorizontal: 20 }} type="normal">The Golden is a members-only community. In order to continue, you need to be in possession of an Aura.</CText>
                <View style={{ paddingHorizontal: 50 }}>
                    <Button chevron caption="Login with your Aura" onClick={handleScanPress} />
                </View>
                <Pressable onPress={() => { router.dismissAll(); router.navigate('/waitlist'); }}>
                    <CText style={{ textAlign: 'center', marginTop: 20 }} type="normal">How to get an Aura</CText>
                </Pressable>
            </View>
        </View>

    </>
    );
}

export default Login