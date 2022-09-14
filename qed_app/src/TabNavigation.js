import React from 'react';
import Home from './Home/Home';
import {useNavigation} from '@react-navigation/native';
import Reserve from './Reserve/Reserve';
import Data from './Data/Data';
import Mypage from './MyPage/Mypage';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : 0;

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#191F28',
        tabBarInActiveTintColor: '#737373',
      }}
      initialRouteName="홈">
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Feather
              name="home"
              size={30}
              tabBarActiveTintColor="#191F28"
              tabBarInActiveTintColor="#737373"
            />
          ),
        }}
      />
      <Tab.Screen
        name="예약"
        component={Reserve}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="document-text-outline" size={30} />,
        }}
      />
      <Tab.Screen
        name="데이터"
        component={Data}
        options={{
          headerTitle: '클럽데이터',
          headerStyle: {
            backgroundColor: '#171717',
            height: 76 + StatusBarHeight,
          },
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 17,
            lineHeight: 27,
          },
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <MaterialIcons name="insert-chart-outlined" size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="마이"
        component={Mypage}
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="user" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
