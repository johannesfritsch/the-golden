import { View, StyleSheet } from 'react-native'
import React from 'react'
import TabBarButton from './TabBarButton';
import { router, usePathname } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';

const tabs = [
  { name: 'events', href: '/events', title: 'Events', icon: (props: any)=> <AntDesign name="home" size={26} {...props} />},
  { name: 'participations', href: '/participations', title: 'My Events', icon: (props: any)=> <AntDesign name="hearto" size={26} {...props} />},
  { name: 'chat', href: '/chat', title: 'Chat', icon: (props: any)=> <AntDesign name="message1" size={26} {...props} />},
  { name: 'profile', href: '/profile', title: 'Profile', icon: (props: any)=> <AntDesign name="user" size={26} {...props} /> }
];

const TabBar = () => {
  const pathName = usePathname();

  const primaryColor = '#B29146';
  const greyColor = '#737373';

  return (
    <View style={styles.tabbar}>
      {tabs.map((tab, index) => {
        return (
          <TabBarButton
            key={tab.name}
            icon={tab.icon}
            style={styles.tabbarItem}
            onPress={() => router.navigate(tab.href as any)}
            onLongPress={() => router.navigate(tab.href as any)}
            isFocused={false}
            color={pathName.startsWith(tab.href) ? primaryColor : greyColor}
            label={tab.title}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    zIndex: 100,
  },
  tabbarItem: {

  }
})

export default TabBar