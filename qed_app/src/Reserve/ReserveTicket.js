import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default ReserveTicket = () => {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>예약 정보 확인</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: '#171717',
    lineHeight: 32,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 32,
  },
  infoView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    height: 63,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    color: '#8D95A1',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
  },
  infoData: {},
});
