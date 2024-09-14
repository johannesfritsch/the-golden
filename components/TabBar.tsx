import { View, StyleSheet } from 'react-native'
import React from 'react'
import TabBarButton from './TabBarButton';
import { router, usePathname } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import BottomBar from './BottomBar';

const tabs = [
  { name: 'events', href: '/events', title: 'Events', icon: (props: any)=> <Feather name="home" size={26} {...props} />},
  { name: 'participations', href: '/participations', title: 'My Events', icon: (props: any)=> <Feather name="heart" size={26} {...props} />},
  { name: 'chat', href: '/chat', title: 'Chat', icon: (props: any)=> <Feather name="message-square" size={26} {...props} />},
  { name: 'profile', href: '/profile', title: 'Profile', icon: (props: any)=> <Feather name="user" size={26} {...props} /> }
];

const TabBar = () => {
  const pathName = usePathname();

  const primaryColor = '#B29146';
  const greyColor = '#737373';

  return (
    <BottomBar>
      {tabs.map((tab, index) => {
        return (
          <TabBarButton
            key={tab.name}
            icon={tab.icon}
            style={{}}
            onPress={() => router.navigate(tab.href as any)}
            onLongPress={() => router.navigate(tab.href as any)}
            isFocused={false}
            color={pathName.startsWith(tab.href) ? primaryColor : greyColor}
            label={tab.title}
          />
        )
      })}
    </BottomBar>
  )
}

export default TabBar