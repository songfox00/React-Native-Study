import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SelectTicket from './SelectTicket';
import Recent from './Recent';

const Tab = createMaterialTopTabNavigator();

export default ReserveTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 15,
          lineHeight: 23,
          color: '#262626',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#171717',
        },
        tabBarStyle: {
          height: 51,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen name="이용권 선택" component={SelectTicket} />
      <Tab.Screen name="최근 이용" component={Recent} />
    </Tab.Navigator>
  );
};
