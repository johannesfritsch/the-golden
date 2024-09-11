import { AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { Platform, SafeAreaView, Text, View } from 'react-native'

export type ModalLayoutProps = {
    children: React.ReactNode
    onClose: () => void
}

const ModalLayout = ({ children, onClose }: ModalLayoutProps) => {
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <SafeAreaView>
                <View style={{ padding: 20 }}>
                    <View>
                        <AntDesign name="close" size={24} color="black" onPress={onClose} />
                    </View>
                    {children}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ModalLayout