import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"
import { Dimensions, View, Text, Pressable } from "react-native"
import Rive, { Alignment, Fit } from "rive-react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrawer } from "@/hooks/useDrawer";
import { MenuView } from '@react-native-menu/menu';
import { Platform } from "react-native";
import CText from "./CText";

export type HeaderProps = {
    leftButton: 'menu' | 'back' | 'none'
    rightButton: 'auth' | 'none'
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
                {rightButton === 'auth' && <Pressable onPress={() => router.navigate('/profile')}><Feather name="user" size={30} color="white" /></Pressable>}
                <MenuView
        title="Menu Title"
        onPressAction={({ nativeEvent }) => {
          console.warn(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: 'add',
            title: 'Add',
            titleColor: '#2367A2',
            image: Platform.select({
              ios: 'plus',
              android: 'ic_menu_add',
            }),
            imageColor: '#2367A2',
            subactions: [
              {
                id: 'nested1',
                title: 'Nested action',
                titleColor: 'rgba(250,180,100,0.5)',
                subtitle: 'State is mixed',
                image: Platform.select({
                  ios: 'heart.fill',
                  android: 'ic_menu_today',
                }),
                imageColor: 'rgba(100,200,250,0.3)',
                state: 'mixed',
              },
              {
                id: 'nestedDestructive',
                title: 'Destructive Action',
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: 'trash',
                  android: 'ic_menu_delete',
                }),
              },
            ],
          },
          {
            id: 'share',
            title: 'Share Action',
            titleColor: '#46F289',
            subtitle: 'Share action on SNS',
            image: Platform.select({
              ios: 'square.and.arrow.up',
              android: 'ic_menu_share',
            }),
            imageColor: '#46F289',
            state: 'on',
          },
          {
            id: 'destructive',
            title: 'Destructive Action',
            attributes: {
              destructive: true,
            },
            image: Platform.select({
              ios: 'trash',
              android: 'ic_menu_delete',
            }),
          },
        ]}
        shouldOpenOnLongPress={false}
      >
        <View>
          <CText type="normal">Test</CText>
        </View>
      </MenuView>
            </View>
        </View>
    )
}

export default Header