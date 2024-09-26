import Button from '@/components/Button'
import CText from '@/components/CText'
import PageControl from '@/components/PageControl'
import { router } from 'expo-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, PanResponder, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ContentSlider from '@/components/ContentSlider'
import VideoPlayer from '@/components/VideoPlayer'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

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

    const contentHeight = useSharedValue(30.0);

    const videoPlayerStyle = useAnimatedStyle(() => ({ 
        height: `${100 - contentHeight.value}%`, 
        backgroundColor: '#000', 
        marginBottom: -30 
    }));

    const contentStyle = useAnimatedStyle(() => ({
        height: `${contentHeight.value}%`,
        backgroundColor: 'white',
        paddingTop: 25,
        paddingHorizontal: 30,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingBottom: insets.bottom,
    }));

    const pageControlStyle = useAnimatedStyle(() => ({
        marginTop: 40 - contentHeight.value,
    }));

    useEffect(() => {
        contentHeight.value = withTiming([35.0, 35.0, 35.0, 35.0, 50.0][currentSlide], {
            duration: 500,
            easing: Easing.elastic(1.5),
        });
    }, [currentSlide]);

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
            <Animated.View style={videoPlayerStyle}>
                <VideoPlayer source={videos[currentSlide]} />
            </Animated.View>
            <Animated.View style={contentStyle}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                    <Animated.View style={pageControlStyle}>
                        <PageControl currentPage={currentSlide} totalPages={5} onPagePress={(index) => {
                            setCurrentSlide(index);
                        }} />
                    </Animated.View>
                    <View style={{}}>
                        <ContentSlider currentSlide={currentSlide} extraGap={30} width={Dimensions.get('window').width - (2 * 30)}>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Welcome to The Golden</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>The Golden is an exclusive community of like-minded people. We offer best-in-class events in very exclusive venues for people to meet, relax and escape the ordinary.</CText>
                                <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Extraordinary Venues</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>The Golden takes you to extraordinary venues that go beyond the expected—exclusive locations chosen for their beauty, uniqueness, and rarity.</CText>
                                <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Curated Elegance</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>Each location is transformed with thoughtful details into an effortless yet unforgettable memory. On top of that, our events come with a well thought-of schedule of exclusive activites.</CText>
                                <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Most Exclusive Guest Lists</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>At The Golden, our guest lists are peer-reviewed, ensuring every event brings together a remarkable circle of influential individuals.</CText>
                                <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
                            </ContentSlider.Item>
                            <ContentSlider.Item>
                                <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Already got an Aura?</CText>
                                <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>Auras are keys to the world of The Golden's exclusive events. They are exquisite jewelry pieces, seamlessly integrated with ultra-secure NFC technology.</CText>
                                <Button style={{ marginBottom: 30 }} caption="See buying options" onClick={() => {
                                    router.navigate('/waitlist');
                                }} />
                                <Pressable onPress={() => router.navigate('/events')}><CText type='bold' style={{ textAlign: 'center' }}>Already got an Aura</CText></Pressable>
                            </ContentSlider.Item>
                        </ContentSlider>
                    </View>
                </View>
            </Animated.View>
        </View>

    )
}

export default Onboarding