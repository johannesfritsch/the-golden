import Button from '@/components/Button'
import CText from '@/components/CText'
import PageControl from '@/components/PageControl'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Video from 'react-native-video'
import ContentSlider from '@/components/ContentSlider'
import { Feather } from '@expo/vector-icons'

const Onboarding = () => {
    const insets = useSafeAreaInsets();
    const [currentSlide, setCurrentSlide] = useState(0);
    const videos = [
        require('@/assets/videos/closeup-arm-wrist.mp4'),
        require('@/assets/videos/outside-of-house.mp4'),
        require('@/assets/videos/man-drinking-coffee.mp4'),
        require('@/assets/videos/woman-on-stairs.mp4'),
        require('@/assets/videos/closeup-ring.mp4'),
    ]

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={{ height: '50%', backgroundColor: '#EEE', marginBottom: -30 }}>
                <Video allowsExternalPlayback={false} source={videos[currentSlide]} playInBackground={true} resizeMode='cover' repeat={true} style={{ width: '100%', height: '100%', zIndex: 100 }} />
            </View>
            <View style={{
                height: '50%',
                backgroundColor: 'white',
                paddingTop: 25,
                paddingBottom: insets.bottom,
                paddingHorizontal: 30,
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
            }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                    <View style={{}}>
                        <PageControl currentPage={currentSlide} totalPages={5} onPagePress={(index) => {
                            setCurrentSlide(index);
                        }} />
                    </View>
                    <View style={{}}>
                        <ContentSlider currentSlide={currentSlide} extraGap={30} width={Dimensions.get('window').width - (2 * 30)}>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Welcome to The Golden</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 10 }}>The Golden offers it's members an exclusive community defined by extraordinary venues, curated elegance, and a formidable selection of guests.</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>It’s where unique experiences and remarkable people come together for something truly unforgettable.</CText>
                                <Button caption='More on our venues' onClick={() => {
                                    setCurrentSlide(1);
                                }} />
                                <Pressable onPress={() => setCurrentSlide(4)}><CText type='bold' style={{ textAlign: 'center', marginTop: 20 }}>Skip</CText></Pressable>
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Extraordinary Venues</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 10 }}>The Golden takes you to extraordinary venues that go beyond the expected—exclusive locations chosen for their beauty, uniqueness, and rarity.</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>Each setting is carefully selected to enhance your experience, offering access to places that are normally reserved for only the most privileged.</CText>
                                <Button caption='More on Curated Elegance' onClick={() => {
                                    setCurrentSlide(2);
                                }} />
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Curated Elegance</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 10 }}>At The Golden, each location is transformed with thoughtful details, creating an effortless yet unforgettable experience.</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 0 }}>Hard to define, but easy to feel the difference.</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>We call it Curated Elegance.</CText>
                                <Button caption='More on our guests' onClick={() => {
                                    setCurrentSlide(3);
                                }} />
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Most Exclusive Guest Lists</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 10 }}>At The Golden, our guest lists are peer-reviewed, ensuring every event brings together a remarkable circle of influential individuals.</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>Each guest plays a role in shaping an exclusive, refined community, creating connections that elevate the experience beyond luxury.</CText>
                                <Button style={{ marginBottom: 20 }} caption="Let's set you up" onClick={() => {
                                    setCurrentSlide(4);
                                }} />
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Already got an Aura?</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 10 }}>Auras are your key to the exclusive world of The Golden.</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>They are exquisite jewelry pieces, seamlessly integrated with ultra-secure NFC technology.</CText>
                                <Button style={{ marginBottom: 20 }} caption='I have my Aura' onClick={() => {
                                    router.navigate('/auth/login');
                                }} />
                                <Button type='secondary' caption="Options to get your Aura" onClick={() => {
                                    router.navigate('/waitlist');
                                }} />
                            </ContentSlider.Item>
                        </ContentSlider>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default Onboarding