import React, {useState} from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const Data = [
  {
    id: 1,
    date: 14,
    day: '오늘',
  },
  {
    id: 2,
    date: 15,
    day: '목',
  },
  {
    id: 3,
    date: 16,
    day: '금',
  },
  {id: 4, date: 17, day: '토'},
  {id: 5, date: 18, day: '일'},
  {id: 6, date: 19, day: '월'},
  {id: 7, date: 20, day: '화'},
];

const Item = ({item, onPress, backgroundColor, color}) => (
  <View style={styles.dateView}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.dateButton, backgroundColor]}>
      <Text style={[styles.dateText, color]}>{item.date}</Text>
    </TouchableOpacity>
    <Text style={[styles.day]}>{item.day}</Text>
  </View>
);

export default DateList = () => {
  const [selectedId, setSelectedId] = useState(1);

  const renderItem = ({item}) => {
    const backgroundColor = selectedId === item.id ? '#ffffff' : '#171717';
    const color = selectedId === item.id ? '#171717' : '#ffffff';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        color={{color}}
      />
    );
  };

  return (
    <FlatList
      data={Data}
      renderItem={renderItem}
      keyExtractor={item => item.date}
      extraData={selectedId}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({
  dateButton: {
    borderRadius: 30,
    width: 32,
    height: 32,
    color: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 27,
  },
  day: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: '#A3A3A3',
  },
  dateView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
