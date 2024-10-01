import Button from '@/components/Button'
import CText from '@/components/CText'
import { NfcAuth } from '@/utils/nfc'
import { trpc } from '@/utils/trpc'
import { router, useFocusEffect } from 'expo-router'
import { Alert, AppState, Pressable, View } from 'react-native'
import nfcManager from 'react-native-nfc-manager'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { decrypt, crc32 } from 'react-native-ntag-424/src/services/crypto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Rive from 'rive-react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

const Login = () => {
    const insets = useSafeAreaInsets();
    const { mutateAsync: loginWithNfcPartOneAsync } = trpc.loginWithNfcPartOne.useMutation();
    const { mutateAsync: loginWithNfcPartTwoAsync } = trpc.loginWithNfcPartTwo.useMutation();

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                AsyncStorage.getItem('token').then(token => token && setToken(token));
            }
            appState.current = nextAppState;
        });
        return () => subscription.remove();
    }, []);
    const [token, setToken] = useState<string | null>(null);
    const [pin, setPin] = useState('');
    const shakeAnimation = useSharedValue(0);

    const hiddenPinStyle = useAnimatedStyle(() => ({
        flexDirection: 'row',
        marginHorizontal: 120,
        marginBottom: 40,
        transform: [{ translateX: shakeAnimation.value }],
    }));



    useFocusEffect(useCallback(() => {
        AsyncStorage.getItem('token').then(token => token && setToken(token));
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

            setToken(serverResponse2.token);
        } catch (error) {
            console.error(error);
        } finally {
            await authenticator.terminate();
        }
    }

    useEffect(() => {
        if (pin.length === 4) {
            console.log('Checking pin', pin, 'for token', token);

            const decryptionKeyFromPin = crc32(Buffer.from(pin, 'hex'));

            let decryptedToken = token ? decrypt(Buffer.from(token, 'hex'), Buffer.alloc(16), Buffer.concat([decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin]), 'aes-128-cbc') : null;
            console.log('------> decryptedToken', decryptedToken?.toString('utf8'));


            if (!(decryptedToken && /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/.test(decryptedToken.toString('utf8').trim()))) {
                shakeAnimation.value = withSequence(
                    withTiming(15, { duration: 50, easing: Easing.elastic(10) }),
                    withTiming(0, { duration: 50, easing: Easing.elastic(10) }),
                    withTiming(-15, { duration: 50, easing: Easing.elastic(10) }),
                    withTiming(0, { duration: 50, easing: Easing.elastic(10) })
                );
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                setTimeout(() => {
                    setPin('');
                }, 250);
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                AsyncStorage.setItem('token', token!);
                AsyncStorage.setItem('pin', pin);
                setTimeout(() => {
                    setPin('');
                }, 250);
                router.back();
            }
        }
    }, [pin]);

    if (!token) return (<>
        <View style={{ backgroundColor: 'white', paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <View style={{ marginTop: -100 }}>
                <View style={{ height: 150, marginBottom: 20 }}>
                    <Rive resourceName='logo' style={{ width: 150, height: 150, alignSelf: 'center' }} />
                </View>
                <CText style={{ textAlign: 'center', marginBottom: 10 }} type="h1">Please login to continue</CText>
                <CText style={{ textAlign: 'center', marginBottom: 40, paddingHorizontal: 20 }} type="normal">The Golden is a members-only community. In order to continue, you need to be in possession of an Aura.</CText>
                <View style={{ paddingHorizontal: 50 }}>
                    <Button chevron caption="Login with your Aura" onClick={handleScanPress} />
                </View>
                <View style={{ paddingHorizontal: 50 }}>
                    <Button type='secondary' chevron caption="How to get an Aura" onClick={() => { router.dismissAll(); router.navigate('/waitlist'); }} />
                </View>
            </View>
        </View>

    </>
    );

    return (<>
        <View style={{ backgroundColor: 'white', paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <View style={{}}>
                <CText style={{ textAlign: 'center', marginBottom: 10 }} type="h1">PIN CODE</CText>
                <CText style={{ textAlign: 'center', marginBottom: 40, marginHorizontal: 60 }} type="normal">Please enter your PIN code to continue. Should you ever forget your pin, please contact our support department.</CText>

                <Animated.View style={hiddenPinStyle}>
                    {[1, 2, 3, 4].map((val, index) => (
                        <View key={index} style={{ width: '25%', padding: 10, aspectRatio: 1.0, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 15, height: 15, backgroundColor: pin.length - 1 < index ? '#CCC' : '#666', borderRadius: 500, justifyContent: 'center', alignItems: 'center' }}>
                            </View>
                        </View>
                    ))}
                </Animated.View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 20, marginHorizontal: 40 }}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''].map((val, index) => (
                        <Pressable disabled={pin.length > 5} onPress={() => { setPin(pin => pin + val) }} key={index} style={{ width: '33.333%', padding: 10, aspectRatio: 1.0, justifyContent: 'center', alignItems: 'center' }}>
                            {({ pressed }) => (
                                <>
                                    {val != '' && <View style={{ width: '100%', height: '100%', backgroundColor: !pressed ? '#EEE' : '#CCC', borderRadius: 500, justifyContent: 'center', alignItems: 'center' }}>
                                        <CText type='h2' style={{ color: !pressed ? '#666' : '#FFF' }}>{val}</CText>
                                    </View>}
                                </>
                            )}
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    </>
    );
}

export default Login