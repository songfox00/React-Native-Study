import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Feather from 'react-native-vector-icons/dist/Feather';

const statusHeight =
  Platform.OS == 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const StoreDetail = () => {
  console.log(navigation);
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#171717', flex: 1, height: '100%'}}>
      <SafeAreaView style={{flexDirection: 'column'}}>
        <ScrollView style={{height: '100%'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{position: 'absolute', left: 21, bottom: 20}}>
              <Feather style={{color: '#ffffff'}} size={24} name="arrow-left" />
            </TouchableOpacity>
            <Text style={styles.title}>매장 상세</Text>
          </View>
          <View style={{height: 200}}>
            <Image
              style={{height: '100%'}}
              source={{
                uri: 'https://img.hankyung.com/photo/202109/99.20936779.1-1200x.jpg',
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              height: '100%',
              paddingTop: 24,
            }}>
            <Text style={styles.store}>QED 직영 1호 광화문점</Text>
            <Text style={styles.address}>서울특별시 중구 광화문로 14</Text>
            <TouchableOpacity style={styles.reserveButton}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  lineHeight: 23,
                  color: '#171717',
                }}>
                예약하기
              </Text>
            </TouchableOpacity>
            <View style={styles.greyline}>
              <View style={styles.underline}>
                <Text style={styles.info}>매장 소개</Text>
              </View>
            </View>
            <Text style={styles.body}>
              서울 종로구 사직로8길 20 경희궁 파크팰리스 지하1층서울 종로구
              사직로8길 20 경희궁 파크팰리스 지하1층서울 종로구 사직로8길 20
              경희궁 파크팰리스 지하1층서울 종로구 사직로8길 20 경희궁
              파크팰리스 지하1층서울 종로구 사직로8길 20 경희궁 파크팰리스
              지하1층서울 종로구 사직로8길 20 경희궁 파크팰리스 지하1층서울
              종로구 사직로8길 20 경희궁 파크팰리스 지하1층서울 종로구 사직로8길
              20 경희궁 파크팰리스 지하1층
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#171717',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 108 - statusHeight,
    width: '100%',
    paddingBottom: 20,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 27,
    color: '#ffffff',
  },
  store: {
    fontSize: 17,
    lineHeight: 27,
    color: '#191F2B',
    fontWeight: '600',
    marginLeft: 21,
    marginRight: 19,
  },
  address: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    color: '#8D95A1',
    marginTop: 4,
    marginLeft: 21,
    marginRight: 19,
  },
  info: {
    color: '#333D4B',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 27,
    textAlign: 'center',
  },
  reserveButton: {
    // width: '100%',
    height: 49,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 21,
    marginRight: 19,
  },
  greyline: {marginTop: 24, borderBottomWidth: 1, borderBottomColor: '#F2F4F6'},
  underline: {
    paddingBottom: 18,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: 64,
    marginLeft: 21,
    marginRight: 19,
  },
  body: {
    fontWeight: '400',
    fontSize: 13,
    alignItems: 'center',
    color: '#404040',
    lineHeight: 18,
    marginLeft: 21,
    marginRight: 19,
    marginTop: 16,
    marginBottom: 158,
  },
});

export default StoreDetail;
