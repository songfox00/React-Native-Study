import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

export default BuyTicket = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('')}
          style={styles.buyButton}>
          <Text style={styles.buttonText}>+ 이용권 구매하기</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          매장 이용권이 없습니다.{'\n'}이용권을 먼저 구매해주세요.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    flex: 1,
  },
  buyButton: {
    backgroundColor: '#171717',
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: 167,
    height: 46,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 174,
    marginBottom: 17,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: 'white',
  },
  text: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: '#737373',
  },
});
