import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import Rive, { Alignment, Fit } from 'rive-react-native';
import tw from 'twrnc';

export default function LoginPage() {
    return (
        <View style={tw`bg-black`}>
            <Rive
                resourceName='thegoldenlockscreen'
                artboardName="Artboard"
                stateMachineName="State Machine 1"
                style={tw`w-full h-full mt-8`}
                alignment={Alignment.TopCenter}
                fit={Fit.Contain}
            />
            <Text style={tw`text-red-500`}>Login Page</Text>
            <Link href={"/"} style={tw`text-red-500`}>Go to Home</Link>
        </View>
    );
}