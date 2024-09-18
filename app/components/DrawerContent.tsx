import { Pressable, View } from 'react-native'
import CText from './CText';
import { router, Href, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Rive, { Alignment, Fit } from 'rive-react-native';
import { useDrawer } from '@/utils/use-drawer';
import { Feather } from '@expo/vector-icons';
import { FeatherIcon } from '@/data/icons';

export type Link = { icon: FeatherIcon, title: string, href: Href<string> };

const links: Link[] = [
    {
        icon: 'home',
        title: 'Events',
        href: '/events'
    },
    {
        icon: 'heart',
        title: 'My Events',
        href: '/participations'
    },
    {
        icon: 'message-square',
        title: 'Chat',
        href: '/chat'
    },
    {
        icon: 'user',
        title: 'Profile',
        href: '/profile'
    }
];

const smallLinks: Link[] = [
    {
        icon: 'register',
        title: 'Product Info',
        href: '/info/productInfo'
    },
    {
        icon: 'imprint',
        title: 'Imprint',
        href: '/info/imprint'
    }
];

const DrawerContent = () => {
    const { toggleDrawer } = useDrawer();
    const insets = useSafeAreaInsets();
    const pathname = usePathname();

    return (
        <View style={{ height: '100%' }}>
            <View style={{ height: 120, marginBottom: 30 }}>
                <Rive onRiveEventReceived={() => router.navigate('/events')} resourceName='logo' artboardName='Artboard' stateMachineName='State Machine 1' alignment={Alignment.Center} fit={Fit.Contain} />
            </View>
            <View>
                {links.map((link) => (
                    <View key={link.href.toString()} style={{ paddingBottom: 5 }}>
                        <Pressable onPress={() => { toggleDrawer(); router.navigate(link.href) }}>
                            <View style={{ gap: 10, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, ...(link.href.toString().startsWith(pathname) ? { backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 100 } : {}) }}>
                                <Feather name={link.icon as any} size={24} style={{ marginTop: 10, marginLeft: 8 }} color={link.href.toString().startsWith(pathname) ? '#333' : 'white'} />
                                <CText type='h2' style={{ padding: 10, ...(link.href.toString().startsWith(pathname) ? { color: '#333' } : { color: 'white' }) }}>{link.title}</CText>
                            </View>
                        </Pressable>
                    </View>))}
            </View>
            <View style={{ position: 'absolute', bottom: 0, paddingBottom: insets.bottom }}>
                <View key={'logout'} style={{ paddingBottom: 10 }}><Pressable onPress={() => { toggleDrawer(); router.dismissAll(); }}><CText type='h3' style={{}}>Logout</CText></Pressable></View>
                {smallLinks.map((link) => (<View key={link.href.toString()} style={{ paddingBottom: 10 }}><Pressable onPress={() => { toggleDrawer(); router.navigate(link.href) }}><CText type='h3' style={{}}>{link.title}</CText></Pressable></View>))}
            </View>
        </View>
    );
}

export default DrawerContent