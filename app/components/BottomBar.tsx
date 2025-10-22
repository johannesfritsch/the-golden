import { Platform, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomBar = ({ children, ...rest }: ViewProps) => {
  const insets = useSafeAreaInsets();
  const baseHeight = 64;
  const height = baseHeight + insets.bottom;

  return (
    <View
      {...rest}
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height,
          paddingBottom: insets.bottom,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderColor: '#eee',
          alignItems: 'center',
          justifyContent: 'center',
          // subtle shadow for smooth appearance
          ...(Platform.OS === 'android'
            ? { elevation: 8 }
            : { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: -2 } }),
        },
        rest.style as any,
      ]}
    >
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>{children}</View>
    </View>
  );
};

export default BottomBar;
