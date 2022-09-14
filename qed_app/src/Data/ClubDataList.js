import React from 'react';
import {FlatList, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';

const Data = [
  {id: 1, data: '우드1'},
  {id: 2, data: '피팅'},
  {id: 3, data: 'Iron7'},
  {id: 4, data: '클럽4'},
  {id: 5, data: '클럽5'},
  {id: 6, data: '드라이버'},
];

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{item.data}</Text>
    <Feather name="chevron-right" size={12} style={{color: '#CBD5E1'}} />
  </TouchableOpacity>
);

export default ClubDataList = () => {
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => {}} />;
  };
  return (
    <FlatList
      data={Data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#E5E8EB',
    borderWidth: 1,
    borderRadius: 4,
    height: 54,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    shadowOpacity: 0.05,
    marginHorizontal: 20,
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
});
