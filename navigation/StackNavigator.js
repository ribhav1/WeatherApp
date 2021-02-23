import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WeatherScreen from '../screens/WeatherScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="WeatherScreen" component={WeatherScreen} options={{headerShown: false}} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
