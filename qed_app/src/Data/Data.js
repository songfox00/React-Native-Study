import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ClubDataList from './ClubDataList';

const Data = () => {
  return (
    <View style={styles.background}>
      <View style={{alignItems: 'flex-start'}}>
        <Text style={styles.title}>클럽 세션데이터</Text>
        <Text style={styles.subTitle}>클럽의 데이터를 확인할 수 있습니다.</Text>
      </View>
      <ClubDataList />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F8FAFC',
    flex: 1,
    paddingVertical: 24,
  },
  title: {
    color: '#171717',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 27,
    marginLeft: 20,
  },
  subTitle: {
    color: '#737373',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 20,
    marginBottom: 4,
  },
});

export default Data;
