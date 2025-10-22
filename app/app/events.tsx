import React, { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import EventCard from '@/components/EventCard';
import TabBar from '@/components/TabBar';
import CText from '@/components/CText';
import { AppState, View } from 'react-native';
import { sampleEvents } from '@/data/event';
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';

export default function EventsScreen() {
  const session = { isLoggedIn: true };

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if ((appState.current as any)?.match(/inactive|background/) && nextAppState === 'active') {
        // refetch if needed
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  return (
    <Drawer>
      {!session.isLoggedIn ? (
        <Layout topElement={<Header leftButton='menu' rightButton='auth' />} bottomElement={<TabBar />}> 
          <View style={{ paddingVertical: 30 }}>
            <CText type='h3'>Please log in to see events.</CText>
          </View>
        </Layout>
      ) : (
        <Layout topElement={<Header leftButton='menu' rightButton='auth' />} bottomElement={<TabBar />}>
          {sampleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Layout>
      )}
    </Drawer>
  );
}
