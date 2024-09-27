import BottomBar from '@/components/BottomBar'
import Button from '@/components/Button'
import CText from '@/components/CText'
import { PropertyView } from '@/components/PropertyView'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import ModalLayout from '@/components/ModalLayout'
import { trpc } from '@/utils/trpc'
import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, Share, View } from 'react-native'
import { formatDuration, intervalToDuration } from 'date-fns'
import { GetWaitlistStatusReturnValue } from '@the-golden-foundation/api'
import Confetti from 'react-native-confetti';

const WaitlistStatus = ({ confetti, status, onLeave, refetch }: { confetti: boolean, refetch: () => void, status: GetWaitlistStatusReturnValue, onLeave: () => void }) => {
    const [informationModalOpen, setInfoModalOpen] = useState(false);
    const [referralModalOpen, setReferralModalOpen] = useState(false);
    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const { mutateAsync: leaveWaitlist } = trpc.leaveWaitlist.useMutation();
    const confettiRef = React.useRef<any>(null);

    useEffect(() => {
        if (confetti) {
            confettiRef.current.startConfetti();
        }
    });

    return (
        <Layout refetch={refetch} topElement={<Header leftButton='back' rightButton={{
            type: 'menu', items: [{
                title: 'Share invite code',
                subtitle: 'get your Aura quicker',
                image: {
                    ios: 'square.and.arrow.up',
                    android: 'ic_menu_share',
                },
                onPress: () => {
                    setReferralModalOpen(true);
                },
            }, {
                title: 'Enter code',
                subtitle: 'get your Aura quicker',
                image: {
                    ios: 'person.2',
                    android: 'ic_menu_set_as',
                },
                onPress: () => {
                    setReferralModalOpen(true);
                },
            }, {
                title: 'Leave the waitlist',
                subtitle: 'This action is irreversible',
                attributes: {
                    destructive: true,
                },
                image: {
                    ios: 'trash',
                    android: 'ic_menu_delete',
                },
                onPress: () => {
                    Alert.alert('Leave the waitlist', 'Are you sure to leave the waitlist? There is no way back.', [
                        {
                            text: 'Leave waitlist', onPress: async () => {
                                await leaveWaitlist();
                                onLeave();
                            }
                        }, { text: 'Cancel', onPress: () => { }, style: 'cancel' }]);
                },
            },]
        }} />} bottomElement={(status?.waitlistEntered && <BottomBar><Button style={{ width: '100%' }} caption='Tired of waiting?' onClick={() => setReferralModalOpen(true)} /></BottomBar>)}>
            {status.waitlistEntered && (
                <>
                    <Confetti ref={confettiRef} confettiCount={80} colors={["#B29146", "#333333", '#CCCCCC']} duration={1000} size={2} radius={2} />
                    <View style={{ marginTop: 50 }}>
                        <CText type='h1' style={{ marginBottom: 20, textAlign: 'center' }}>Your Waitlist Position</CText>
                        <CText type='normal' style={{ marginBottom: 30, textAlign: 'center' }}>To ensure the best possible experience for all users, we need to make sure that users are released into the app in regional chunks. We are working hard to remove this waitlist as soon as possible.</CText>
                        <View style={{ marginBottom: 20 }}>
                            <CText type='h0' style={{ textAlign: 'center' }}>{status.waitlistPosition}</CText>
                        </View>
                        <CText type='normal' style={{ marginBottom: 20, textAlign: 'center' }}>Estimated waiting time: {status.estimatedTimeRemaining < 24 * 60 * 60 * 1000 ? 'very soon' : formatDuration(intervalToDuration({ start: 0, end: status.estimatedTimeRemaining }), { format: ['days'] })}</CText>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                            <Pressable onPress={() => setInfoModalOpen(true)}>
                                <CText type='underline' style={{ marginBottom: 20, textAlign: 'center' }}>Information</CText>
                            </Pressable>
                            <Pressable onPress={() => setCodeModalOpen(true)}>
                                <CText type='underline' style={{ marginBottom: 20, textAlign: 'center' }}>I got a code</CText>
                            </Pressable>
                        </View>
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
                                <Button style={{ width: '100%' }} caption='Share The Golden now' onClick={() => {
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
                </>
            )}
        </Layout>

    )
}

export default WaitlistStatus

const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));