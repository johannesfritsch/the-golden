import { createContext, useContext, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import DrawerContent from "./DrawerContent";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DrawerContextType = {
    drawerOpen: boolean;
    toggleDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return context;
};

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
        backgroundColor: '#ffffff',
        paddingTop: insets.top,
    }));

    const bodyStyle = useAnimatedStyle(() => ({
        flex: 1,
        width: '100%',
        transform: [{ translateX: xOffset.value }],
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        zIndex: 10000,
        display: xOffset.value / drawerWidth >= 0.0 ? 'flex' : 'none',
        backgroundColor: 'black',
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
                <DrawerContent />
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