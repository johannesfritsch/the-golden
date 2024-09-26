import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"
import { Dimensions, View, Text, Pressable } from "react-native"
import Rive, { Alignment, Fit } from "rive-react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrawer } from "@/hooks/useDrawer";
import { MenuView,  } from '@react-native-menu/menu';
import { Platform } from "react-native";

export type HeaderProps = {
    leftButton: 'menu' | 'back' | 'none'
    rightButton: { type: 'menu', items: {
        title: string;
        subtitle?: string;
        image: {
            ios: string;
            android: string;
        },
        attributes?: {
            destructive?: boolean;
        },
        onPress: () => void;
    }[] } | { type: 'none' }
}

const Header = ({ leftButton, rightButton }: HeaderProps) => {
    const insets = useSafeAreaInsets();
    const { toggleDrawer } = useDrawer();

    return (
        <View style={{ backgroundColor: '#B29146', height: 50 + insets.top, zIndex: 100 }}>
            <View style={{ position: 'absolute', left: 0, width: 70, height: 50, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                {leftButton === 'menu' && <Pressable onPress={() => toggleDrawer()}><Feather name="menu" size={30} color="white" /></Pressable>}
                {leftButton === 'back' && <Pressable onPress={() => router.back()}><Feather name="chevron-left" size={30} color="white" /></Pressable>}
            </View>
            <View style={{ position: 'absolute', bottom: -50, left: Dimensions.get('window').width / 2 - 50, width: 100, height: 100 }}>
                <Rive resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
            </View>
            <View style={{ position: 'absolute', right: 0, width: 70, height: 50, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                {rightButton.type === 'menu' && (
                    <MenuView
                        onPressAction={({ nativeEvent }) => {
                            rightButton.items[parseInt(nativeEvent.event)].onPress();
                        }}
                        actions={rightButton.items.map((item, index) => ({
                                id: index.toString(),
                                title: item.title,
                                subtitle: item.subtitle,
                                image: Platform.OS === 'ios' ? item.image.ios : item.image.android,
                                attributes: item.attributes,
                        }))}
                    >
                        <View>
                            <Feather name="more-horizontal" size={30} color="white" />
                        </View>
                    </MenuView>)}
            </View>
        </View>
    )
}

export default Header