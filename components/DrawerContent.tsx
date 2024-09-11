import { Pressable, View } from 'react-native'
import CText from './CText'
import { useDrawer } from './Drawer'

const DrawerContent = () => {
    const { toggleDrawer } = useDrawer();

    return (
        <View><Pressable onPress={() => toggleDrawer()}><CText type='h2'>Close drawer</CText></Pressable></View>
    )
}

export default DrawerContent