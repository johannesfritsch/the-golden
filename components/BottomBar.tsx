import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useEffect } from "react"
import { useDrawer } from "@/utils/use-drawer"

export type BottomBarProps = {
  children: React.ReactNode
}

const BottomBar = ({ children }: BottomBarProps) => {
  const insets = useSafeAreaInsets();
  const yOffset = useSharedValue(0);
  const { drawerOpen } = useDrawer();

  useEffect(() => {
    yOffset.value = withTiming(drawerOpen ? 120 : 0, {
      duration: 400,
      easing: Easing.elastic(0.2),
    });
  }, [drawerOpen]);

  return (
    <Animated.View style={{
      width: '100%',
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: 15,
      paddingBottom: 15 + insets.bottom,
      paddingHorizontal: 20,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      borderCurve: 'continuous',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10,
      shadowOpacity: 0.3,
      zIndex: 100,
      transform: [{ translateY: yOffset }]
    }}>
      {children}
    </Animated.View>
  );
}

export default BottomBar;