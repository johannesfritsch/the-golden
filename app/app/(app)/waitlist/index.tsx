import BottomBar from '@/components/BottomBar'
import Button from '@/components/Button'
import CText from '@/components/CText'
import { PropertyView } from '@/components/PropertyView'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import ModalLayout from '@/components/ModalLayout'
import { trpc } from '@/utils/trpc'
import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Modal, Pressable, Share, View } from 'react-native'
import Rive, { Alignment, Fit, RiveRef } from 'rive-react-native'
import { formatDuration, intervalToDuration } from 'date-fns'


const WaitlistStatus = () => {
    const { isPending, isFetching, error, data } = trpc.getWaitlistStatus.useQuery("test");
    const riveRef = React.useRef<RiveRef>(null);
    const [informationModalOpen, setInfoModalOpen] = useState(false);
    const [referralModalOpen, setReferralModalOpen] = useState(false);
    const [codeModalOpen, setCodeModalOpen] = useState(false);

    useEffect(() => {
        if (!riveRef || !riveRef.current || !data || !data.waitlistEntered) return;

        const num1 = Math.floor(data.waitlistPosition / 1000);
        const num2 = Math.floor((data.waitlistPosition % 1000) / 100);
        const num3 = Math.floor((data.waitlistPosition % 100) / 10);
        const num4 = data.waitlistPosition % 10;

        setTimeout(() => {
            riveRef.current?.setInputStateAtPath('number', num1, 'number1');
        }, 2000);
        setTimeout(() => {
            riveRef.current?.setInputStateAtPath('number', num2, 'number2');
        }, 1400);
        setTimeout(() => {
            riveRef.current?.setInputStateAtPath('number', num3, 'number3');
        }, 800);
        setTimeout(() => {
            riveRef.current?.setInputStateAtPath('number', num4, 'number4');
        }, 200);

    }, [data, riveRef]);

    return (
        <Layout loading={isPending || isFetching} error={error || undefined} topElement={<Header leftButton='back' rightButton='none' />} bottomElement={(data?.waitlistEntered && <BottomBar><Button caption='Tired of waiting?' onClick={() => setReferralModalOpen(true)} /></BottomBar>)}>
            {error && <CText type='h1'>An error has occurred: {error.message}</CText>}
            {!isPending && !isFetching && !error && data && (
                <View style={{ marginTop: 50 }}>
                    {!data.waitlistEntered && <Redirect href='/waitlist/info' />}
                    <CText type='h1' style={{ marginBottom: 20, textAlign: 'center' }}>Your Waitlist Status</CText>
                    <CText type='normal' style={{ marginBottom: 0, textAlign: 'center' }}>To ensure the best possible experience for all users, we need to make sure that users are released into the app in regional chunks. We are working hard to remove this waitlist as soon as possible.</CText>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 0, paddingHorizontal: 90 }}>
                        <Rive ref={riveRef} resourceName='golden-ticket' artboardName='Main 2' stateMachineName='State Machine' alignment={Alignment.Center} fit={Fit.Contain} style={{ width: 150, height: 150 }} />
                    </View>
                    <CText type='normal' style={{ marginBottom: 20, textAlign: 'center' }}>Estimated waiting time: {formatDuration(intervalToDuration({ start: 0, end: data.estimatedTimeRemaining }), { format: ['days'] })}</CText>
                    <Pressable onPress={() => setInfoModalOpen(true)}>
                        <CText type='boldunderline' style={{ marginBottom: 20, textAlign: 'center' }}>Information</CText>
                    </Pressable>
                    <Pressable onPress={() => setCodeModalOpen(true)}>
                        <CText type='boldunderline' style={{ marginBottom: 20, textAlign: 'center' }}>I got a code</CText>
                    </Pressable>
                    <Modal visible={informationModalOpen} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setInfoModalOpen(false)}>
                        <ModalLayout onClose={() => setInfoModalOpen(false)}>
                            <CText type='h1' style={{ marginBottom: 20 }}>Your Waitlist Status</CText>
                            <CText type='normal' style={{ marginBottom: 30 }}>To ensure the best possible experience for all users, we need to make sure that users are released into the app in regional chunks. We are working hard to remove this waitlist as soon as possible.</CText>
                            <PropertyView style={{ marginBottom: 25 }} icon={'search'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                            <PropertyView style={{ marginBottom: 25 }} icon={'code'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                            <PropertyView style={{ marginBottom: 25 }} icon={'heart'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                        </ModalLayout>
                    </Modal>
                    <Modal visible={referralModalOpen} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setReferralModalOpen(false)}>
                        <ModalLayout onClose={() => setReferralModalOpen(false)}>
                            <CText type='h1' style={{ marginBottom: 20 }}>Refer Friends, Skip the Wait</CText>
                            <CText type='normal' style={{ marginBottom: 30 }}>To ensure the best possible experience for all users, we need to make sure that users are released into the app in regional chunks. We are working hard to remove this waitlist as soon as possible.</CText>
                            <PropertyView style={{ marginBottom: 25 }} icon={'search'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                            <PropertyView style={{ marginBottom: 25 }} icon={'code'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                            <PropertyView style={{ marginBottom: 40 }} icon={'heart'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                            <Button caption='Share The Golden with your friends now' onClick={() => {
                                Share.share({
                                    message: `🚀 Join me on The Golden! 🏆

Discover exclusive 3-day luxury getaways packed with exciting events, all tailored for unforgettable experiences. Use my code [ABC123] when you sign up to unlock special offers!

Download the app now:

	•	iPhone: [iPhone App Link]
	•	Android: [Android App Link]

Let’s embark on a golden adventure together! 🌟`,
                                    url: 'https://www.google.de',
                                    title: '🚀 Join me on The Golden! 🏆',
                                }, {

                                })
                            }} />
                        </ModalLayout>
                    </Modal>
                    <Modal visible={codeModalOpen} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setCodeModalOpen(false)}>
                        <ModalLayout onClose={() => setCodeModalOpen(false)}>
                            <CText type='h1' style={{ marginBottom: 20 }}>Got a code?</CText>
                            <CText type='normal' style={{ marginBottom: 30 }}>If you have received a code, you can enter it here. It will skip the whole or parts of the waitlist for you.</CText>

                            <Button caption='Redeem code' onClick={() => { }} />
                        </ModalLayout>
                    </Modal>

                </View>
            )}
        </Layout>
    )
}

export default WaitlistStatus

const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));