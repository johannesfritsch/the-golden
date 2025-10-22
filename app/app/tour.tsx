import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Stack, router } from 'expo-router';
import { Dimensions, PanResponder, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';
import CText from '@/components/CText';
import PageControl from '@/components/PageControl';
import ContentSlider from '@/components/ContentSlider';
import VideoPlayer from '@/components/VideoPlayer';
import Button from '@/components/Button';

const videos = [
  require('../assets/videos/closeup-arm-wrist.mp4'),
  require('../assets/videos/outside-of-house.mp4'),
  require('../assets/videos/man-drinking-coffee.mp4'),
  require('../assets/videos/woman-on-stairs.mp4'),
  require('../assets/videos/closeup-ring.mp4'),
];

export default function TourScreen() {
  const insets = useSafeAreaInsets();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [handled, setHandled] = useState(false);
  const windowDims = useWindowDimensions();

  const contentHeight = useSharedValue(30.0);
  const pageControlMarginTop = useSharedValue(25);
  const [measuredSlideHeights, setMeasuredSlideHeights] = useState<Record<number, number>>({});

  const videoPlayerStyle = useAnimatedStyle(() => ({
    height: `${100 - contentHeight.value}%`,
    backgroundColor: '#000',
    marginBottom: -30,
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
    marginTop: pageControlMarginTop.value,
  }));

  useEffect(() => {
    const measured = measuredSlideHeights[currentSlide];
    if (measured && windowDims.height) {
      const paddingTop = 25;
      const paddingBottom = insets.bottom;
      const totalNeeded = measured + paddingTop + paddingBottom;
      const pct = (totalNeeded / windowDims.height) * 100;
      const clampedPct = Math.max(28, Math.min(78, pct));
      contentHeight.value = withTiming(clampedPct, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } else {
      contentHeight.value = withTiming([32.5, 32.5, 32.5, 32.5, 55.0][currentSlide], {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
    pageControlMarginTop.value = withTiming([30, 30, 30, 30, 0][currentSlide], {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [currentSlide, measuredSlideHeights, windowDims.height]);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onPanResponderGrant: () => {
        setHandled(false);
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_evt, gestureState) => {
        if (handled) return;
        if (gestureState.dx > 50 && currentSlide > 0) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCurrentSlide(currentSlide - 1);
          setHandled(true);
          return;
        } else if (gestureState.dx < -50 && currentSlide < 4) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCurrentSlide(currentSlide + 1);
          setHandled(true);
          return;
        }
      },
    });
  }, [handled, currentSlide]);

  const renderSlide = useCallback((index: number) => {
    if (index === 0) {
      return (
        <>
          <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Welcome to The Golden</CText>
          <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>The Golden is an exclusive community of like-minded people. We offer best-in-class events in very exclusive venues for people to meet, relax and escape the ordinary.</CText>
          <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
        </>
      );
    }
    if (index === 1) {
      return (
        <>
          <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Extraordinary Venues</CText>
          <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>The Golden takes you to extraordinary venues that go beyond the expected—exclusive locations chosen for their beauty, uniqueness, and rarity.</CText>
          <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
        </>
      );
    }
    if (index === 2) {
      return (
        <>
          <CText type='h1' style={{ textAlign: 'center', marginBottom: 10 }}>Curated Elegance</CText>
          <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>Each location is transformed with thoughtful details into an effortless yet unforgettable memory. On top of that, our events come with a well thought-of schedule of exclusive activites.</CText>
          <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
        </>
      );
    }
    if (index === 3) {
      return (
        <>
          <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Exclusive Guest Lists</CText>
          <CText type='normal' style={{ textAlign: 'center', marginBottom: 20 }}>Our guest lists are peer-reviewed, ensuring every event brings together a remarkable circle of influential individuals.</CText>
          <CText type='bold' style={{ textAlign: 'center', opacity: 0.3 }}>Swipe right to proceed</CText>
        </>
      );
    }
    return (
      <>
        <CText type='h1' style={{ textAlign: 'center', marginBottom: 20 }}>Already got an Aura?</CText>
        <CText type='normal' style={{ textAlign: 'center', marginBottom: 40 }}>Auras are keys to the world of The Golden's exclusive events. They are exquisite jewelry pieces, seamlessly integrated with ultra-secure NFC technology.</CText>
        <Button style={{ marginBottom: 30 }} caption="See buying options" chevron onClick={() => {
          router.navigate('/waitlist');
        }} />
        <Pressable onPress={() => router.navigate('/events')}><CText type='link' style={{ textAlign: 'center' }}>Already got an Aura</CText></Pressable>
      </>
    );
  }, []);

  const onMeasureLayout = useCallback((e: any) => {
    const h = e?.nativeEvent?.layout?.height;
    if (typeof h === 'number' && h > 0) {
      setMeasuredSlideHeights(prev => ({ ...prev, [currentSlide]: h }));
    }
  }, [currentSlide]);

  return (
    <>
      <Stack.Screen options={{ title: 'App Tour' }} />
      <Layout style={styles.layout} level="1">
        <View {...panResponder.panHandlers} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
          <Animated.View style={videoPlayerStyle}>
            <VideoPlayer source={videos[currentSlide]} />
          </Animated.View>
          <Animated.View style={contentStyle}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
              <Animated.View style={pageControlStyle}>
                <PageControl
                  currentPage={currentSlide}
                  totalPages={5}
                  onPagePress={(index) => {
                    setCurrentSlide(index);
                  }}
                />
              </Animated.View>
              <View>
                <ContentSlider currentSlide={currentSlide} extraGap={30} width={Dimensions.get('window').width - 60}>
                  <ContentSlider.Item>
                    {renderSlide(0)}
                  </ContentSlider.Item>
                  <ContentSlider.Item>
                    {renderSlide(1)}
                  </ContentSlider.Item>
                  <ContentSlider.Item>
                    {renderSlide(2)}
                  </ContentSlider.Item>
                  <ContentSlider.Item>
                    {renderSlide(3)}
                  </ContentSlider.Item>
                  <ContentSlider.Item>
                    {renderSlide(4)}
                  </ContentSlider.Item>
                </ContentSlider>
              </View>
            </View>
          </Animated.View>

          {/* Hidden measurement container for dynamic height calculation */}
          <View style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', left: -9999, width: Dimensions.get('window').width - 60 }} onLayout={onMeasureLayout}>
            {/* Render current slide content to measure natural height */}
            <View style={{ paddingTop: 25, paddingHorizontal: 30 }}>
              <View style={{ marginTop: [30, 30, 30, 30, 0][currentSlide] }} />
              {renderSlide(currentSlide)}
            </View>
          </View>
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'white',
  },
});


