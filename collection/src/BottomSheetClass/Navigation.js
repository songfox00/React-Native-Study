import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomSheet from './src/BottomSheetClass';
import Home from './src/Home';

class NavigationClass extends Component {
    state = {
        Stack: null
    }
    render() {
        this.setState({
            Stack: createStackNavigator()
        })
        const { Stack } = this.state;
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="BottomSheet" component={BottomSheet} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default NavigationClass;