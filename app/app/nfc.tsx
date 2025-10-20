import React, { useMemo } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Card, Button, Avatar } from '@ui-kitten/components';
import { UserPlus2, MessageCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/components/useColorScheme';

// Icons removed to avoid pulling in react-native-eva-icons (React 16 dependency)

type User = {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  interests: string[];
  stats: { followers: number; following: number; events: number };
};

export default function NFCScreen() {
  const colorScheme = useColorScheme();

  // Sample auth + profile data (replace with real data later)
  const auth = { isLoggedIn: true, currentUserId: 'u_123' }; // toggle for testing
  const profileUser: User = {
    id: 'u_456',
    name: 'Alexandra Gold',
    username: 'alex_g',
    bio: 'Collector of rare moments. Lover of art, architecture and candlelit jazz.',
    avatar: 'https://i.pravatar.cc/200?img=65',
    interests: ['Modern Art', 'Jazz', 'Architecture', 'Fine Dining'],
    stats: { followers: 128, following: 87, events: 12 },
  };

  const isOwnProfile = useMemo(
    () => auth.isLoggedIn && auth.currentUserId === profileUser.id,
    [auth.isLoggedIn, auth.currentUserId, profileUser.id]
  );

  return (
    <>
      <Stack.Screen options={{ title: 'NFC Profile' }} />
      <Layout style={styles.container} level="1">
        <Card style={styles.card} appearance="filled">
          <View style={styles.header}>
            <Avatar source={{ uri: profileUser.avatar }} style={styles.avatar} />
            <View style={styles.headerText}>
              <Text category="h5">{profileUser.name}</Text>
              <Text appearance="hint">@{profileUser.username}</Text>
            </View>
          </View>

          {isOwnProfile ? (
            <Card style={styles.banner} status="warning" appearance="filled">
              <Text category="s2">You scanned your own profile.</Text>
              <Text appearance="hint" category="c1">This is the public guest view.</Text>
            </Card>
          ) : !auth.isLoggedIn ? (
            <Card style={styles.banner} status="basic" appearance="filled">
              <Text category="s2">Not logged in.</Text>
              <Text appearance="hint" category="c1">Showing guest view. Log in to check if this is your profile.</Text>
            </Card>
          ) : null}

          <Text style={styles.bio} category="s1">
            {profileUser.bio}
          </Text>

          <View style={styles.tags}>
            {profileUser.interests.map((tag) => (
              <Button key={tag} size="tiny" appearance="ghost" status="basic" style={styles.tagBtn}>
                {tag}
              </Button>
            ))}
          </View>

          <Card style={styles.stats} appearance="outline">
            <View style={styles.statItem}>
              <Text category="label">Followers</Text>
              <Text category="s1">{profileUser.stats.followers}</Text>
            </View>
            <View style={styles.statItem}>
              <Text category="label">Following</Text>
              <Text category="s1">{profileUser.stats.following}</Text>
            </View>
            <View style={styles.statItem}>
              <Text category="label">Events</Text>
              <Text category="s1">{profileUser.stats.events}</Text>
            </View>
          </Card>

          <View style={styles.actions}>
            <Button
              style={styles.actionBtn}
              accessoryLeft={(props) => (
                <UserPlus2 color={props?.tintColor ?? undefined} size={20} />
              )}
            >
              Follow
            </Button>
            <Button
              style={styles.actionBtn}
              appearance="outline"
              accessoryLeft={(props) => (
                <MessageCircle color={props?.tintColor ?? undefined} size={20} />
              )}
            >
              Message
            </Button>
          </View>
        </Card>
      
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 520,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  headerText: {
    flexDirection: 'column',
    gap: 4,
  },
  banner: {
    marginTop: 8,
  },
  bio: {
    marginTop: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tagBtn: {
    marginRight: 4,
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
  },
});


