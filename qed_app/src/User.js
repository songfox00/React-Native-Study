import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// import {getStatusBarHeight} from 'react-native-status-bar-height';

// const getStatusBarHeight = StatusBar.currentHeight;

export default user = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        // flex: 1,
        marginTop: 44,
        alignItems: 'center',
        position: 'absolute',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            borderRadius: 35,
            marginRight: 10,

            marginLeft: 20,
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
            position: 'absolute',

            marginLeft: 97,
          }}>
          <Text style={[styles.user, {fontSize: 11, fontWeight: '400'}]}>
            South Korea
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 2,
              marginBottom: 8,
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.user,
                {fontSize: 16, fontWeight: '700', marginRight: 2},
              ]}>
              김민정
            </Text>
            <Text style={[styles.user, {fontSize: 14, fontWeight: '400'}]}>
              회원
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={[
                styles.user,
                {
                  fontSize: 13,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                },
              ]}>
              이용권 구매하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: 34,
          height: 34,
          position: 'absolute',

          right: 20,
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 6,
            alignItems: 'center',
          }}>
          <Ionicons name="barcode-outline" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    color: '#fff',
  },
});
