import BottomBar from '@/components/BottomBar';
import Button from '@/components/Button';
import CText from '@/components/CText'
import { PropertyView } from '@/components/PropertyView';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WaitlistForm, { WaitlistFormData } from './_form';
import ModalLayout from '@/components/ModalLayout';
import { trpc } from '@/utils/trpc';
import { Notifications } from 'react-native-notifications';

export type WaitListInfoProps = {
  onJoin: (values: WaitlistFormData) => void
}

const WaitlistInfo = ({ onJoin }: WaitListInfoProps) => {
  const insets = useSafeAreaInsets();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { mutateAsync: enterWaitlist } = trpc.enterWaitlist.useMutation();

  return (
    <Layout topElement={<Header leftButton='back' rightButton={{ type: 'none' }} />} bottomElement={<BottomBar><Button caption='Join the waitlist' style={{ width: '100%' }} onClick={() => setIsFormVisible(true)} /></BottomBar>}>
      <ScrollView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'white', paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <CText type='h1' style={{ marginBottom: 20 }}>Early Access Program</CText>
        <CText type='normal' style={{ marginBottom: 20 }}>To ensure the best possible experience for all users, we limit the amount of users, that enter the app simultaneously. We are working hard to remove this waitlist as soon as possible.</CText>
        <View style={{ marginVertical: 25, gap: 25, paddingTop: 5, paddingBottom: 30 }}>
          <PropertyView icon='dollar-sign' title='100% Free' description='Joining the waitlist costs nothing. No upfront payments. Only if you later choose to buy an Aura, you will be charged.' />
          <PropertyView icon='sun' title='No obligations' description='There are absolutely no strings attached when you join the waitlist. You’re not committed to anything.' />
          <PropertyView icon='coffee' title='Regular updates' description='You receive push notifications whenever your position changes significantly. Also we keep you informed about news about The Golden.' />
        </View>
      </ScrollView>
      <Modal visible={isFormVisible} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setIsFormVisible(false)}>
        <ModalLayout closeIcon={false} onClose={() => setIsFormVisible(false)}>
          <WaitlistForm onSubmit={async (values) => {
            console.log('Before enterWaitlist', values);
            await enterWaitlist({ ...values });
            console.log('After enterWaitlist');
            onJoin(values);
            setIsFormVisible(false);
          }} />
        </ModalLayout>
      </Modal>
    </Layout>
  )
}

export default WaitlistInfo

