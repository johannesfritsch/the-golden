import CText from '@/components/CText';
import { PropertyView } from '@/components/PropertyView';
import React, { useState } from 'react'
import { Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import { Share } from 'react-native';
import Button from '@/components/Button';
import { trpc } from '@/utils/trpc';

const ShareCodeModal = () => {
    const { data } = trpc.getReferralCode.useQuery();
    const [copied, setCopied] = useState(false);

    return (
        <>
            <CText type='h1' style={{ marginBottom: 20 }}>Refer Friends, Skip the Wait</CText>
            <CText type='normal' style={{ marginBottom: 30 }}>To ensure the best possible experience for all users, we moderate the flow of users into the app. But rest assured, that we are working hard to remove this limit as soon as possible.</CText>
            <PropertyView style={{ marginBottom: 25 }} icon={'search'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
            <PropertyView style={{ marginBottom: 25 }} icon={'code'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
            <PropertyView style={{ marginBottom: 40 }} icon={'heart'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />

            <CText type='normal' style={{ marginBottom: 30 }}>You can pass the following code to a friend. This gives both of you a boost in our waitlist.</CText>
            <Pressable onPress={() => {
                if (copied || !data?.referralCode) return;
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                Clipboard.setString(data?.referralCode);
                setCopied(true);
                setInterval(() => {
                    setCopied(false);
                }, 2000);
            }} style={{ backgroundColor: '#CCC', marginHorizontal: 60, marginBottom: 40, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10, flexDirection: 'row' }}>
                <CText type='h3' style={{ flexGrow: 1, textAlign: 'center' }}>{data?.referralCode}</CText>
                {!copied && (<Feather name='copy' size={20} color='#666' />)}
                {copied && (<Feather name='check' size={20} color='green' />)}
            </Pressable>

            <Button style={{ width: '100%' }} caption='Share The Golden now' onClick={() => {
                Share.share({
                    message: `🚀 Join me on The Golden! 🏆

Discover exclusive 3-day luxury getaways packed with exciting events, all tailored for unforgettable experiences. Use my code [${data?.referralCode}] when you sign up to unlock special offers!

Download the app now:

	•	iPhone: [iPhone App Link]
	•	Android: [Android App Link]

Let’s embark on a golden adventure together! 🌟`,
                    url: 'https://www.google.de',
                    title: '🚀 Join me on The Golden! 🏆',
                }, {

                })
            }} />
        </>
    )
}

export default ShareCodeModal