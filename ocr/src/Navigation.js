import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import HomeCrop from './HomeCrop';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeCrop" component={HomeCrop} options={{ headerShown: false }} />
                {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;