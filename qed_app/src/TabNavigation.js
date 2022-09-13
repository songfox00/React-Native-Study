import React from 'react';
import Home from './Home';
import {useNavigation} from '@react-navigation/native';
import Reserve from './Reserve';
import Data from './Data';
import Mypage from './Mypage';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: '#0F172A'}}
      initialRouteName="홈">
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: () => <Feather name="home" size={30} />,
        }}
      />
      <Tab.Screen
        name="예약"
        component={Reserve}
        options={{
          tabBarIcon: () => <Ionicons name="document-text-outline" size={30} />,
        }}
      />
      <Tab.Screen
        name="데이터"
        component={Data}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="insert-chart-outlined" size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="마이"
        component={Mypage}
        options={{tabBarIcon: () => <Feather name="user" size={30} />}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
