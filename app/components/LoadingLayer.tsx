import { Feather } from "@expo/vector-icons"
import { View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"


const LoadingLayer = () => {
    const rotation = useSharedValue(0);
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1);

    const loadingIconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View style={loadingIconStyle}>
                <Feather name='loader' size={50} color='#B49146' />
            </Animated.View>
        </View>
    )
}

export default LoadingLayer