import React from 'react';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StoreDetail from './src/StoreDetail';
import TabNavigation from './src/TabNavigation';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ReserveTicket from './src/Reserve/ReserveTicket';

const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : 0;

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StoreDetail"
          component={StoreDetail}
          options={{
            headerTitle: '매장 상세',
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
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ReserveTicket"
          component={ReserveTicket}
          options={{
            headerTitle: '예약하기',
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
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
