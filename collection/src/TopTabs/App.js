import React from 'react';
import { SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/Home';
import { Mypage } from './src/Mypage';
import { Setting } from './src/Setting';

const Tab = createMaterialTopTabNavigator();

export const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName='Home'>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Mypage" component={Mypage} />
                    <Tab.Screen name="Setting" component={Setting} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}