import { StatusBar } from 'expo-status-bar'
import { Platform, SafeAreaView, Text, View } from 'react-native'

export type ModalLayoutProps = {
    title: string
    children: React.ReactNode
}

const ModalLayout = ({ title, children }: ModalLayoutProps) => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                {children}
            </View>
        </SafeAreaView>
    )
}

export default ModalLayout