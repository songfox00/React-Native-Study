import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import RestTicket from './RestTicket';

const Data = [
  {
    id: 1,
    store: 'QED 반포',
    type: '오픈베이',
    due: 149,
    data: [
      {time: '10:00~10:30', rest: 7},
      {time: '10:30~11:00', rest: 3},
      {time: '11:00~11:30', rest: 3},
      {time: '11:30~12:00', rest: 1},
      {time: '12:00~12:30', rest: 10},
    ],
  },
  {
    id: 2,
    store: 'QED 직영 1호 광화문점',
    type: '스튜디오',
    due: 10,
    data: [
      {time: '10:00~10:30', rest: 7},
      {time: '10:30~11:00', rest: 3},
      {time: '11:00~11:30', rest: 3},
      {time: '11:30~12:00', rest: 1},
      {time: '12:00~12:30', rest: 10},
    ],
  },
];

const Item = ({item, onPress, reservePress, check}) =>
  item.type == '오픈베이' ? (
    <TouchableOpacity style={[styles.container, {height: 250}]}>
      <View style={styles.top}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.store}>{item.store}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.type, {color: '#1D4ED8'}]}>{item.type}</Text>
            <Text style={styles.due}>
              {' * 남은기간 '}
              {item.due}
              {'일'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.ticketDetailButton}>
          <Text style={styles.ticketDetailText}>이용권 상세</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 24, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={reservePress}
          style={[
            styles.changeButton,
            {backgroundColor: check == true ? '#171717' : '#fff'},
          ]}>
          <Text
            style={[
              styles.changeText,
              {color: check == true ? '#fff' : '#525252'},
            ]}>
            일반 예약
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={reservePress}
          style={[
            styles.changeButton,
            {backgroundColor: check == false ? '#171717' : '#fff'},
          ]}>
          <Text
            style={[
              styles.changeText,
              {color: check == false ? '#fff' : '#525252'},
            ]}>
            줄서기
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 24}}>
        <RestTicket />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[styles.container, {height: 184}]}>
      <View style={styles.top}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.store}>{item.store}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.type, {color: '#EF4444'}]}>{item.type}</Text>
            <Text style={styles.due}>
              {' * 남은회수 '}
              {item.due}
              {'회'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.ticketDetailButton}>
          <Text style={styles.ticketDetailText}>이용권 상세</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 16}}>
        <RestTicket />
      </View>
    </TouchableOpacity>
  );

export default SelectTicket = () => {
  const [check, setCheck] = useState(true);

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {}}
        check={check}
        reservePress={() => (check == true ? setCheck(false) : setCheck(true))}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F8FAFC'}}>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  store: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 27,
    color: '#262626',
  },
  type: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
  },
  due: {
    color: '#737373',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
  },
  ticketDetailButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    height: 31,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  ticketDetailText: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19,
    color: '#4B5563',
  },
  changeButton: {
    borderRadius: 50,
    height: 34,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
});
