import { AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { Platform, SafeAreaView, Text, View } from 'react-native'

export type ModalLayoutProps = {
    children: React.ReactNode
    onClose: () => void
    closeIcon?: boolean
}

const ModalLayout = ({ children, onClose, closeIcon = true }: ModalLayoutProps) => {
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <SafeAreaView>
                <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                    {closeIcon && (<View style={{ marginBottom: 30 }}>
                        <AntDesign name="close" size={24} color="black" onPress={onClose} />
                    </View>)}
                    {children}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ModalLayout