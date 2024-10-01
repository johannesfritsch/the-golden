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
import Confetti from 'react-native-confetti'
import ShareCodeModal from './_shareCodeModal'
import EnterCodeModal from './_enterCodeModal'
import { router, useLocalSearchParams } from 'expo-router'

const WaitlistStatus = ({ showConfetti, status, onLeave, refetch, onConfettiEnded, onCodeEntered }: { showConfetti: boolean, onConfettiEnded: () => void, onCodeEntered: () => void, refetch: () => void, status: GetWaitlistStatusReturnValue, onLeave: () => void }) => {
    const [informationModalOpen, setInfoModalOpen] = useState(false);
    const [referralModalOpen, setReferralModalOpen] = useState(false);
    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const { mutateAsync: leaveWaitlist } = trpc.leaveWaitlist.useMutation();
    const confettiRef = React.useRef<any>(null);

    useEffect(() => {
        if (showConfetti) {
            confettiRef.current.startConfetti();
            onConfettiEnded();
        }
    }, [showConfetti]);

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
                    setCodeModalOpen(true);
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
                        <CText type='normal' style={{ marginBottom: 20, textAlign: 'center' }}>To ensure the best possible experience for all users, we moderate the flow of users into the app. But rest assured, that we are working hard to remove this limit as soon as possible.</CText>
                        <Pressable style={{ marginBottom: 40 }} onPress={() => setInfoModalOpen(true)}>
                            <CText type='link' style={{ textAlign: 'center' }}>More information</CText>
                        </Pressable>
                        <View style={{ marginBottom: 20 }}>
                            <CText type='h0' style={{ textAlign: 'center' }}># {status.waitlistPosition}</CText>
                        </View>
                        <CText type='normal' style={{ marginBottom: 20, textAlign: 'center' }}>Estimated waiting time: {status.estimatedTimeRemaining < 24 * 60 * 60 * 1000 ? 'very soon' : formatDuration(intervalToDuration({ start: 0, end: status.estimatedTimeRemaining }), { format: ['days'] })}</CText>
                        <Pressable onPress={() => setCodeModalOpen(true)}>
                            <CText type='link' style={{ textAlign: 'center' }}>Enter a code now</CText>
                        </Pressable>
                        <Modal visible={informationModalOpen} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setInfoModalOpen(false)}>
                            <ModalLayout onClose={() => setInfoModalOpen(false)}>
                                <CText type='h1' style={{ marginBottom: 20 }}>Your Waitlist Status</CText>
                                <CText type='normal' style={{ marginBottom: 30 }}>To ensure the best possible experience for all users, we moderate the flow of users into the app. But rest assured, that we are working hard to remove this limit as soon as possible.</CText>
                                <PropertyView style={{ marginBottom: 25 }} icon={'search'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                                <PropertyView style={{ marginBottom: 25 }} icon={'code'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                                <PropertyView style={{ marginBottom: 25 }} icon={'heart'} title={'Headline'} description={'To ensure the best possible experience for all users, we need to make sure that.'} />
                            </ModalLayout>
                        </Modal>
                        <Modal visible={referralModalOpen} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setReferralModalOpen(false)}>
                            <ModalLayout onClose={() => setReferralModalOpen(false)}>
                                <ShareCodeModal />
                            </ModalLayout>
                        </Modal>
                        <Modal visible={codeModalOpen} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setCodeModalOpen(false)}>
                            <ModalLayout onClose={() => setCodeModalOpen(false)}>
                                <EnterCodeModal onCodeEntered={onCodeEntered} />
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