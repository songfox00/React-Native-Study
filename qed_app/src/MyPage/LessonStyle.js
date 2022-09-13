import React from 'react';
import {View, Text, FlatList} from 'react-native';

const lessonData = [
  {style: '훅교정'},
  {style: '슬라이스교정'},
  {style: '비거리향상'},
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
      {item.style}
    </Text>
  </View>
);

export default LessonStyle = () => {
  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <FlatList
        data={lessonData}
        renderItem={renderItem}
        numColumns={4}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};
