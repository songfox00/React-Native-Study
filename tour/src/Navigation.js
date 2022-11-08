import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import TourMap from './TourMap';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='MainTab' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTab" component={MainTab} />
                <Stack.Screen name="TourMap" component={TourMap} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Navigation;