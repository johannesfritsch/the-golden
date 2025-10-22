import { Pressable, Text, View, ViewStyle } from 'react-native';
import React from 'react';

export type TabBarButtonProps = {
  icon: (props: any) => React.ReactNode;
  label: string;
  color: string;
  style?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
  isFocused?: boolean;
};

const TabBarButton = ({ icon, label, color, style, onPress, onLongPress, isFocused }: TabBarButtonProps) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={({ pressed }) => ({ alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1 })}>
      <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
        {icon({ color })}
        <Text style={{ color, fontSize: 12, marginTop: 4 }}>{label}</Text>
        {isFocused && <View style={{ marginTop: 6, width: 22, height: 3, borderRadius: 2, backgroundColor: color }} />}
      </View>
    </Pressable>
  );
};

export default TabBarButton;
