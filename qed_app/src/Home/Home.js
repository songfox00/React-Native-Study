import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import ReserveList from './ReserveList';
import UsableTicket from './UsableTicket';
import User from './User';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import StoreDetail from '../StoreDetail';

const Stack = createStackNavigator();

const Home = () => {
  // console.log('navigation:', navigation);
  return (
    <View style={styles.background}>
      <View style={{backgroundColor: '#171717', height: '50%'}}></View>
      <SafeAreaView
        style={{
          flexDirection: 'column',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <ReserveList />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F8FAFC',
    flex: 1,
    height: '100%',
  },
  user: {
    color: '#fff',
  },
});

export default Home;
