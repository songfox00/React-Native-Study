import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

const Data = [
  {id: 1, place: 'QED 반포', kind: '오픈베이', due: 10},
  {id: 2, place: 'QED 반포', kind: '스튜디오', due: 40},
  {id: 3, place: 'QED 반포', kind: '오픈베이', due: 49},
  {id: 4, place: 'QED 반포', kind: '스튜디오', due: 131},
  {id: 5, place: 'QED 반포', kind: '스튜디오', due: 149},
];

const Item = ({item, pressStore, pressReserve}) => {
  return (
    <View style={{paddingHorizontal: 4, paddingBottom: 10}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={pressStore}
          style={{
            height: 69,
            borderBottomWidth: 1,
            borderColor: '#F3F4F6',
          }}>
          <View>
            <Text
              style={{
                fontSize: 17,
                color: '#262626',
                fontWeight: '600',
                lineHeight: 27,
              }}>
              {item.place}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.textKind,
                {
                  color: item.kind == '오픈베이' ? 'red' : 'blue',
                  lineHeight: 18,
                },
              ]}>
              {item.kind}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#737373',
                fontWeight: '600',
                lineHeight: 18,
              }}>
              {'   '}*{'   '}남은기간 {item.due}일
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{height: 52, justifyContent: 'center', alignItems: 'center'}}
          onPress={pressReserve}>
          <Text style={{fontWeight: '700', fontSize: 15}}>예약하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const UsableTicket = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        pressStore={() => {
          navigation.navigate('StoreDetail');
        }}
        pressReserve={() => {}}
      />
    );
  };

  return (
    <FlatList
      style={{paddingHorizontal: 16, paddingBottom: 10}}
      data={Data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    width: 279,
    height: 142,
    flexDirection: 'column',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    elevation: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textKind: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default UsableTicket;
