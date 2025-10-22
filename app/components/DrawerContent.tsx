import { Pressable, View } from 'react-native';
import CText from './CText';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrawer } from '@/hooks/useDrawer';
import { Feather } from '@expo/vector-icons';

const links = [
  { icon: 'home', title: 'Events', href: '/events' },
  { icon: 'heart', title: 'My Events', href: '/participations' },
  { icon: 'message-square', title: 'Chat', href: '/chat' },
  { icon: 'user', title: 'Profile', href: '/profile' },
] as const;

const smallLinks = [
  { icon: 'activity', title: 'Product Info', href: '/info/productInfo' },
  { icon: 'activity', title: 'Imprint', href: '/info/imprint' },
] as const;

const DrawerContent = () => {
  const { toggleDrawer } = useDrawer();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <View style={{ height: '100%' }}>
      <View style={{ height: 120, marginBottom: 30, alignItems: 'center', justifyContent: 'center' }}>
        <CText type='h2' style={{ color: 'white' }}>The Golden</CText>
      </View>
      <View>
        {links.map((link) => (
          <View key={link.href} style={{ paddingBottom: 5 }}>
            <Pressable onPress={() => { toggleDrawer(); router.navigate(link.href as any); }}>
              <View style={{ gap: 10, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, ...(pathname.startsWith(link.href) ? { backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 100 } : {}) }}>
                <Feather name={link.icon as any} size={24} style={{ marginTop: 10, marginLeft: 8 }} color={pathname.startsWith(link.href) ? '#333' : 'white'} />
                <CText type='h2' style={{ padding: 10, ...(pathname.startsWith(link.href) ? { color: '#333' } : { color: 'white' }) }}>{link.title}</CText>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
      <View style={{ position: 'absolute', bottom: 0, paddingBottom: insets.bottom }}>
        <View key={'logout'} style={{ paddingBottom: 10 }}>
          <Pressable onPress={() => { toggleDrawer(); router.dismissAll(); }}><CText type='h3'>Logout</CText></Pressable>
        </View>
        {smallLinks.map((link) => (
          <View key={link.href} style={{ paddingBottom: 10 }}>
            <Pressable onPress={() => { toggleDrawer(); router.navigate(link.href as any); }}><CText type='h3'>{link.title}</CText></Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DrawerContent;
