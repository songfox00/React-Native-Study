import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import ReserveList from './ReserveList';
import UsableTicket from './UsableTicket';
import User from './User';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import StoreDetail from './StoreDetail';

const Stack = createStackNavigator();

const Home = () => {
  // console.log('navigation:', navigation);
  return (
    <View style={{backgroundColor: '#171717', flex: 1, height: '100%'}}>
      <SafeAreaView style={{flexDirection: 'column'}}>
        <ReserveList />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    color: '#fff',
  },
});

export default Home;
