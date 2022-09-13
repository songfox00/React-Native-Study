import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import StoreDetail from './StoreDetail';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="StoreDetail" component={StoreDetail} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
