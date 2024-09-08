import CText from '@/components/CText';
import ModalLayout from '@/components/ModalLayout';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

const Modal = () => {
    return (
        <ModalLayout title="About The Golden">
            <View style={{ marginTop: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={() => { router.dismissAll(); router.push('/events'); }}><CText type='h3'>Click here</CText></Pressable>
            </View>
        </ModalLayout>
    )
}

export default Modal

