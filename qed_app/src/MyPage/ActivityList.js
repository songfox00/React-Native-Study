import React from 'react';
import {View, Text, FlatList} from 'react-native';

const ActivityData = [
  {title: 'QED 직영 아카데미 광화문점'},
  {title: 'The QED'},
  {title: 'QED 직영 아카데미 광화문점'},
];

const Item = ({item}) => (
  <View
    style={{
      paddingVertical: 4,
      paddingHorizontal: 10,
      backgroundColor: '#F1F5F9',
      marginRight: 8,
      height: 26,
      alignSelf: 'flex-start',
      borderRadius: 4,
      marginTop: 8,
    }}>
    <Text
      style={{
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#404040',
      }}>
      {item.title}
    </Text>
  </View>
);

export default ActivityList = () => {
  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <FlatList
        data={ActivityData}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};
