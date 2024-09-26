import Button from '@/components/Button'
import CText from '@/components/CText'
import PageControl from '@/components/PageControl'
import { router } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import { Dimensions, PanResponder, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ContentSlider from '@/components/ContentSlider'
import VideoPlayer from '@/components/VideoPlayer'

const videos = [
    require('@/assets/videos/closeup-arm-wrist.mp4'),
    require('@/assets/videos/outside-of-house.mp4'),
    require('@/assets/videos/man-drinking-coffee.mp4'),
    require('@/assets/videos/woman-on-stairs.mp4'),
    require('@/assets/videos/closeup-ring.mp4'),
];

const Onboarding = () => {
    const insets = useSafeAreaInsets();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [handled, setHandled] = useState(false);

    const panResponder = useMemo(() => {
        return PanResponder.create({
            onPanResponderGrant: () => {
                setHandled(false);
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                if (handled) return;
                if (gestureState.dx > 50 && currentSlide > 0) {
                    setCurrentSlide(currentSlide - 1);
                    setHandled(true);
                } else if (gestureState.dx < -50 && currentSlide < 4) {
                    setCurrentSlide(currentSlide + 1);
                    setHandled(true);
                }
            },
        })
    }, [handled, currentSlide]);

    return (
        <View {...panResponder.panHandlers} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <View style={{ height: '50%', backgroundColor: '#000', marginBottom: -30 }}>
                <VideoPlayer source={videos[currentSlide]} />
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
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>The Golden is an exclusive community of like-minded people. We offer best-in-class events in very exclusive venues for people to meet, relax and escape the ordinary.</CText>
                                <Button style={{ marginBottom: 30, paddingHorizontal: 50 }} chevron caption='' onClick={() => {
                                    setCurrentSlide(1);
                                }} />
                                <Pressable onPress={() => setCurrentSlide(4)}><CText type='bold' style={{ textAlign: 'center' }}>Skip introduction</CText></Pressable>
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Extraordinary Venues</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>The Golden takes you to extraordinary venues that go beyond the expected—exclusive locations chosen for their beauty, uniqueness, and rarity.</CText>
                                <Button chevron caption='' style={{ paddingHorizontal: 50 }} onClick={() => {
                                    setCurrentSlide(2);
                                }} />
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Curated Elegance</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>Each location is transformed with thoughtful details into an effortless yet unforgettable memory. On top of that, our events come with a well thought-of schedule of exclusive activites.</CText>
                                <Button chevron caption='' style={{ paddingHorizontal: 50 }} onClick={() => {
                                    setCurrentSlide(3);
                                }} />
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Most Exclusive Guest Lists</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>At The Golden, our guest lists are peer-reviewed, ensuring every event brings together a remarkable circle of influential individuals.</CText>
                                <Button chevron style={{ marginBottom: 20, paddingHorizontal: 50 }} caption="" onClick={() => {
                                    setCurrentSlide(4);
                                }} />
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Already got an Aura?</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>Auras are your key to the world of The Golden's exclusive events. They are exquisite jewelry pieces, seamlessly integrated with ultra-secure NFC technology.</CText>
                                <Button style={{ marginBottom: 30 }} caption="Get your own Aura" onClick={() => {
                                    router.navigate('/waitlist');
                                }} />
                                <Pressable onPress={() => router.navigate('/events')}><CText type='bold' style={{ textAlign: 'center' }}>Already got an Aura</CText></Pressable>
                            </ContentSlider.Item>
                        </ContentSlider>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default Onboarding