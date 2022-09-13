import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/Home';
import Reserve from './src/Reserve';
import Data from './src/Data';
import Mypage from './src/Mypage';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import StackNavigation from './src/StackNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false, tabBarActiveTintColor: '#0F172A'}}
        initialRouteName="홈">
        <Tab.Screen
          name="홈"
          component={StackNavigation}
          navigation={navigation}
          options={{
            tabBarIcon: () => <Feather name="home" size={30} />,
          }}
        />
        <Tab.Screen
          name="예약"
          component={Reserve}
          options={{
            tabBarIcon: () => (
              <Ionicons name="document-text-outline" size={30} />
            ),
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
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
