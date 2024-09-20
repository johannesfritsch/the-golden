import { useEffect } from "react";
import { View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export type ContentSliderProps = {
    children: React.ReactNode;
    currentSlide: number;
    width: number;
    extraGap?: number;
}

const ContentSlider = ({ children, currentSlide, width, extraGap = 0 }: ContentSliderProps) => {
    const offset = useSharedValue(currentSlide);

    const sliderStyle = useAnimatedStyle(() => ({
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: extraGap,
        transform: [{ translateX: -offset.value }],
    }));

    useEffect(() => {
        offset.value = withTiming((currentSlide * width) + (currentSlide * extraGap), {
            duration: 400,
            easing: Easing.elastic(0.2),
        });
    }, [currentSlide]);

    return (
        <Animated.View style={sliderStyle}>
            {children}
        </Animated.View>
    )
}

export type ContentSliderItemProps = {
    children: React.ReactNode
}

ContentSlider.Item = ({ children }: ContentSliderItemProps) => {
    

    return (
        <View style={{ justifyContent: 'flex-start', width: '100%' }}>
            {children}
        </View>
    )
}

export default ContentSlider;
