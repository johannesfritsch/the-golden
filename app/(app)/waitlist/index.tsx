import BottomBar from '@/components/BottomBar';
import Button from '@/components/Button';
import CText from '@/components/CText'
import { PropertyView } from '@/components/EventProperty';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Modal, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Rive, { Alignment, Fit } from 'rive-react-native';

const Waitlist = () => {
  const insets = useSafeAreaInsets();
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      <ScrollView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'white', paddingTop: insets.top, paddingBottom: insets.bottom, paddingHorizontal: 30 }}>
        <Rive resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 40 }} />
        <CText type='h1' style={{ marginBottom: 20 }}>Early Access Program</CText>
        <CText type='normal' style={{}}>By joining the waiting list, you’ll secure a spot to be among the first to experience what The Golden has to offer. This program ensures equal opportunity for those interested in participating in our exclusive events.</CText>
        <View style={{ marginVertical: 25, gap: 25, paddingTop: 5, paddingBottom: 30 }}>
          <PropertyView icon='dollar-sign' title='100% Free' description='Joining the waitlist costs nothing. No upfront payments. Only if you later choose to buy an Aura, you will be charged.' />
          <PropertyView icon='sun' title='No obligations' description='There are absolutely no strings attached when you join the waitlist. You’re not committed to anything.' />
          <PropertyView icon='coffee' title='Insider updates' description='By joining, you’ll be among the first to receive exclusive updates, including early access to event announcements and special offers.' />
        </View>
      </ScrollView>
      <BottomBar>
        <Button caption='Join the waitlist' onClick={() => setIsFormVisible(true)} />
      </BottomBar>
      <Modal visible={isFormVisible} animationType="slide" presentationStyle="formSheet" onRequestClose={() => setIsFormVisible(false)}>
        
      </Modal>
    </>
  )
}

export default Waitlist