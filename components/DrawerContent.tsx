import { Pressable, View } from 'react-native'
import CText from './CText';
import { useDrawer } from './Drawer';
import { router, Href } from 'expo-router';

export type Link = { title: string, href: Href<string> };

const links: Link[] = [
    {
        title: 'Events',
        href: '/events'
    },
    {
        title: 'My Events',
        href: '/participations'
    },
    {
        title: 'Chat',
        href: '/chat'
    },
    {
        title: 'Profile',
        href: '/profile'
    }
];

const DrawerContent = () => {
    const { toggleDrawer } = useDrawer();

    return links.map((link, index) => (
        <View style={{ paddingBottom: 10 }}><Pressable onPress={() => { toggleDrawer(); router.navigate(link.href) }}><CText type='h1'>{link.title}</CText></Pressable></View>
    ));
}

export default DrawerContent