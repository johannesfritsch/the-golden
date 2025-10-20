import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Video } from 'expo-av';

export type VideoPlayerProps = {
  source: any;
};

const VideoPlayer = ({ source }: VideoPlayerProps) => {
  const [currentSource, setCurrentSource] = useState<any>(source);
  const opacity = useSharedValue(1.0);

  const overlayStyles = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    zIndex: 101,
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (!source) return;
    opacity.value = withTiming(1.0, { duration: 300, easing: Easing.elastic(0.2) });
    setTimeout(() => {
      setCurrentSource(source);
    }, 300);
  }, [source]);

  const handleVideoLoad = () => {
    setTimeout(() => {
      opacity.value = withTiming(0.0, { duration: 1250, easing: Easing.elastic(0.2) });
    }, 150);
  };

  return (
    <View>
      <Animated.View style={overlayStyles}></Animated.View>
      <Video
        onLoad={handleVideoLoad}
        source={currentSource}
        isLooping
        shouldPlay
        isMuted
        resizeMode="cover"
        style={{ width: '100%', height: '100%', zIndex: 100 }}
      />
    </View>
  );
};

export default VideoPlayer;


