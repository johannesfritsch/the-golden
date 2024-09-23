import { createContext, useContext, useState } from "react";
import { Alert, Dimensions, Pressable, View } from "react-native";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import DrawerContent from "./DrawerContent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { DrawerContext } from "@/hooks/useDrawer";

export type DrawerProps = {
    children: React.ReactNode;
};

const Drawer = ({ children }: DrawerProps) => {
    const drawerWidth = Dimensions.get('window').width * 0.8;
    const xOffset = useSharedValue(0);
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);

    const drawerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: -drawerWidth + xOffset.value }],
        flex: 1,
        position: 'absolute',
        width: drawerWidth,
        height: '100%',
        left: 0,
        backgroundColor: '#B29146',
        zIndex: 10000,
    }));

    const bodyStyle = useAnimatedStyle(() => ({
        flex: 1,
        width: '100%',
        transform: [{ translateX: xOffset.value }],
        backgroundColor: 'white',
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 1000,
        backgroundColor: 'black',
        display: xOffset.value / drawerWidth >= 0.1 ? 'flex' : 'none',
        opacity: xOffset.value / drawerWidth * 0.5,
    }));

    const toggleDrawer = () => {
        setOpen(!open);
        xOffset.value = withTiming(xOffset.value === 0 ? drawerWidth : 0, {
            duration: 400,
            easing: Easing.elastic(0.2),
        });
    };

    return (
        <DrawerContext.Provider value={{ drawerOpen: open, toggleDrawer }}>
            <Animated.View style={drawerStyle}>
                {/* <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 50 + insets.top, zIndex: 1000, backgroundColor: '#B29146' }}>
                    <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                        <Pressable style={{}} onPress={toggleDrawer}>
                            <AntDesign name='close' size={34} color='white' />
                        </Pressable>
                    </View>
                </View> */}
                <View style={{ paddingHorizontal: 40, paddingTop: 20 + insets.top + 35 }}>
                    <DrawerContent />
                </View>
            </Animated.View>

            <Animated.View style={bodyStyle}>
                <Animated.View style={overlayStyle}>
                    <Pressable onPress={toggleDrawer} style={{ width: '100%', height: '100%' }} />
                </Animated.View>
                <View style={{ flex: 1 }}>
                    {children}
                </View>
            </Animated.View>
        </DrawerContext.Provider>
    );
};

export default Drawer;