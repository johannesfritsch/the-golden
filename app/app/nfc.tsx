import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function NFCScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'NFC' }} />
      <Text style={styles.title}>/nfc</Text>
      <Text>This is the NFC screen inside the app.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
});


