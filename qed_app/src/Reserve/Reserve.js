import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import ReserveDate from './ReserveDate';
import ReserveTab from './ReserveTab';

const Reserve = () => {
  return (
    <View style={{backgroundColor: '#171717', flex: 1, height: '100%'}}>
      <SafeAreaView style={{flexDirection: 'column'}}>
        <View style={styles.header}>
          <ReserveDate />
        </View>
        <View style={{backgroundColor: '#F8FAFC', height: '100%'}}>
          <ReserveTab />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Reserve;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#171717',
    height: 149,
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
});
