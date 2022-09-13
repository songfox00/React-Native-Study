import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ActivityList from './ActivityList';
import LessonStyle from './LessonStyle';
import MypageUser from './MypageUser';

const Mypage = () => {
  return (
    <View style={styles.background}>
      <SafeAreaView style={{flexDirection: 'column'}}>
        <MypageUser />
        <View style={styles.body}>
          <View style={styles.sectionBody}>
            <Text style={[styles.sectionHeader, {marginBottom: 4}]}>
              자기소개
            </Text>
            <Text style={styles.intro}>골프 주린이입니다.</Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionHeaderView}>
              <Text style={styles.sectionHeader}>활동 지점</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.manage}>관리</Text>
              </TouchableOpacity>
            </View>
            <ActivityList />
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionHeaderView}>
              <Text style={styles.sectionHeader}>관심 레슨 스타일</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.manage}>관리</Text>
              </TouchableOpacity>
            </View>
            <LessonStyle />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#171717',
    flex: 1,
    height: '100%',
  },
  whiteColor: {
    color: '#fff',
  },
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
    paddingBottom: 20,
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#171717',
  },
  sectionBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
  },
  intro: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19,
    color: '#404040',
  },
  manage: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 19,
    color: '#509BED',
  },
  sectionHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Mypage;
