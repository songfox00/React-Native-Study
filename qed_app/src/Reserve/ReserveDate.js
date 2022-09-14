import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateList from './DateList';

export default ReserveDate = () => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 28}}>
        <Text style={styles.date}>2020년 9월</Text>
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapText}>지도</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 25,
        }}>
        <DateList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 27,

    color: '#fff',
  },
  mapButton: {
    width: 69,
    height: 29,
    paddingVertical: 4,
    paddingHorizontal: 14,
    backgroundColor: '#FAFAFA',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: 12,
  },
  mapText: {
    fontWeight: '600',
    fontSize: 13,

    color: '#262626',
  },
});
