import { createStackNavigator } from '@react-navigation/stack';
import AudioScreen from '../Screens/AudioScreen';

const Navigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="AudioScreen">
            <Stack.Screen
                name="AudioScreen"
                component={AudioScreen}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}
export default Navigation