import CText from './CText'
import { Modal, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from './Button'
import { router } from 'expo-router'

export type LockScreenProps = {
    children?: React.ReactNode
    error: Error | null
    onResetError: () => void
}

const LockScreen = ({ children, error, onResetError }: LockScreenProps) => {
    const insets = useSafeAreaInsets();

    return (<>
        {children}
        <Modal visible={error != null} animationType="slide" presentationStyle='pageSheet' >
            <View style={{ backgroundColor: 'white', paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <View>
                    <CText style={{ textAlign: 'center', marginBottom: 10 }} type="h1">LockScreen</CText>
                    <CText style={{ textAlign: 'center', marginBottom: 40 }} type="normal">Please unlock the screen</CText>
                    <Button chevron caption="Unlock" onClick={() => onResetError()} />
                    <Pressable onPress={() => { router.back(); onResetError(); }}>
                        <CText style={{ textAlign: 'center', marginTop: 20 }} type="normal">Skip login</CText>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </>
    );
}

export default LockScreen