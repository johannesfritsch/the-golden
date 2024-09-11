import CText from '@/components/CText'
import ModalLayout from '@/components/ModalLayout';
import { router } from 'expo-router';
import React from 'react'
import { Pressable, View } from 'react-native';

const LoginLinfo = () => {
    return (
        <ModalLayout onClose={() => { router.back() }}>
            <View style={{ marginTop: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={() => { router.dismissAll(); router.push('/events'); }}><CText type='h3'>Click here</CText></Pressable>
            </View>
        </ModalLayout>
    )
}

export default LoginLinfo