import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';

export default MyPageUser = () => {
  return (
    <View style={styles.header}>
      <View style={styles.menuIcon}>
        <Feather
          name="bell"
          size={24}
          style={[styles.whiteColor, {marginRight: 19}]}
        />
        <Feather name="align-justify" size={24} style={styles.whiteColor} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 28,
        }}>
        <View
          style={{
            marginRight: 12,
          }}>
          <Image
            style={{width: 60, height: 60, borderRadius: 30}}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}></Image>
        </View>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text style={styles.country}>South Korea</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.whiteColor, styles.username, {marginRight: 3}]}>
              김민정
            </Text>
            <Text style={[styles.whiteColor, styles.username]}>회원</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.lesson}>
        <Text style={styles.lessonText}>레슨 노트</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#171717',
    height: 224,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  menuIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  whiteColor: {
    color: '#fff',
  },
  country: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    color: '#94A3B8',
  },
  username: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '600',
  },
  lesson: {
    backgroundColor: '#404040',
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  lessonText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
    color: '#FAFAFA',
  },
});
