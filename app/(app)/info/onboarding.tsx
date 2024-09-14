import Button from '@/components/Button'
import CText from '@/components/CText'
import { router } from 'expo-router'
import { Dimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Video from 'react-native-video'
import Rive, { Alignment, Fit } from 'rive-react-native'

const Onboarding = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={{ height: '60%', backgroundColor: '#CCC', marginBottom: -30 }}>
                <Video source={require('@/assets/videos/man-drinking-coffee.mp4')} playInBackground={true} resizeMode='cover' repeat={true} style={{ width: '100%', height: '100%', zIndex: 100 }} />
            </View>
            <View style={{
                height: '40%',
                backgroundColor: 'white',
                paddingTop: 25,
                paddingBottom: insets.bottom,
                paddingHorizontal: 30,
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
            }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 20 }}>
                    <View style={{}}>
                        <CText type='h1' style={{ textAlign: 'center' }}>Welcome to The Golden</CText>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                        <CText type='normal' style={{ textAlign: 'center' }}>The Golden is a new way to experience the world. By wearing your Aura bracelet, necklace, or ring, you can unlock exclusive events, experiences, and more.</CText>
                    </View>
                    <View style={{}}>
                        <Button caption='Get Started' onClick={() => { router.navigate('/auth/login') }} />
                    </View>
                </View>
            </View>
        </View>

    )
}

export default Onboarding