import { View, StyleSheet } from "react-native"

export type BottomBarProps = {
    children: React.ReactNode
}

const BottomBar = ({ children }: BottomBarProps) => {
  return (
    <View style={styles.tabbar}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    zIndex: 100,
  },
})

export default BottomBar;