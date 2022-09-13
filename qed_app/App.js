import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StoreDetail from './src/StoreDetail';
import TabNavigation from './src/TabNavigation';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigation} />
        <Stack.Screen name="StoreDetail" component={StoreDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
