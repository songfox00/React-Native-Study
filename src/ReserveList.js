import React from 'react';
import {
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import User from './User';
import UsableTicket from './UsableTicket';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const Data = [
  {
    title: '예약 내역',
    data: [
      {
        id: 1,
        kind: '오픈베이',
        reserve: '예약완료',
        date: '2022.03.17(목)',
        time: '10:00~11:00',
        address: 'QED 직영 1호 광화문점 / A룸',
      },
      {
        id: 2,
        kind: '스튜디오',
        reserve: '예약완료',
        date: '2022.03.18(금)',
        time: '10:00~11:00',
        address: 'QED 직영 1호 광화문점 / T5',
      },
      {
        id: 3,
        kind: '오픈베이',
        reserve: '예약완료',
        date: '2022.03.20(일)',
        time: '10:00~11:00',
        address: 'QED 직영 1호 광화문점 / T5',
      },
      {
        id: 4,
        kind: '오픈베이',
        reserve: '예약완료',
        date: '2022.03.21(월)',
        time: '10:00~11:00',
        address: 'QED 직영 1호 광화문점 / T5',
      },
      {
        id: 5,
        kind: '스튜디오',
        reserve: '예약완료',
        date: '2022.03.22(화)',
        time: '10:00~11:00',
        address: 'QED 직영 1호 광화문점 / T5',
      },
    ],
  },
];

const Item = ({kind, reserve, date, time, address, onPress}) => (
  <View
    style={{
      // marginVertical: 8,
      // marginHorizontal: 16,
      backgroundColor: '#F8FAFC',
    }}>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: kind == '오픈베이' ? '#FEF2F2' : '#EFF6FF',
              borderColor: kind == '오픈베이' ? '#FECACA' : '#BFDBFE',
              marginRight: 8,
            },
          ]}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: kind == '오픈베이' ? 'red' : 'blue',
            }}>
            {kind}
          </Text>
        </View>
        <View
          style={[
            styles.infoBox,
            {backgroundColor: '#F9FAFB', borderColor: '#E5E8EB'},
          ]}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#333D4B'}}>
            {reserve}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.date}>
          {date}
          {'  |  '}
        </Text>
        <Text style={styles.date}>{time}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.address}>{address}</Text>
      </View>

      <Feather
        style={{
          position: 'absolute',
          right: 20,
          top: 48,
        }}
        name="chevron-right"
        size={15}
      />
    </TouchableOpacity>
  </View>
);

const statusHeight =
  Platform.OS == 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const Header = ({title}) => (
  <View>
    <View
      style={{
        backgroundColor: '#171717',
        height: 219 - statusHeight,
        width: '100%',
        // justifyContent: 'center',
      }}>
      <User />
    </View>
    <View style={{height: 40, width: '100%', backgroundColor: '#fff'}}></View>

    <View style={{backgroundColor: '#F8FAFC', width: '100%', height: 103}}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#475569',
          paddingLeft: 16,
          marginTop: 75,
          paddingBottom: 8,
        }}>
        {title}
      </Text>
    </View>
    <View
      style={{
        marginTop: 140,
        width: '100%',
        position: 'absolute',
      }}>
      <UsableTicket />
    </View>
  </View>
);

export default ReserveList = () => {
  // console.log(navigation);
  return (
    // <View style={{width: '100%', height: '100%'}}>
    <SectionList
      style={{backgroundColor: '#171717'}}
      sections={Data}
      renderSectionHeader={({section}) => <Header title={section.title} />}
      renderItem={({item}) => (
        // <View style={{top: 340}}>
        <Item
          kind={item.kind}
          reserve={item.reserve}
          date={item.date}
          time={item.time}
          address={item.address}
          onPress={({navigation}) => {
            // navigation.navigate('roture',);
          }}
        />
        // </View>
      )}
      keyExtractor={item => item.id}
      stickySectionHeadersEnabled={false}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 108,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  infoBox: {
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  date: {
    color: '#191F28',
    fontWeight: '700',
    fontSize: 15,
  },
  address: {
    fontSize: 13,
    fontWeight: '400',
    color: '#8D95A1',
  },
});
