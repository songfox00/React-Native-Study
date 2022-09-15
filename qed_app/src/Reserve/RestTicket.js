import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const Data = [
  {time: '10:00~10:30', rest: 7},
  {time: '10:30~11:00', rest: 3},
  {time: '11:00~11:30', rest: 3},
  {time: '11:30~12:00', rest: 1},
  {time: '12:00~12:30', rest: 10},
];

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.timeView}>
      <Text style={styles.timeTextStart}>{item.time.split('~')[0]}</Text>
      <Text style={styles.timeTextEnd}>
        {'~'}
        {item.time.split('~')[1]}
      </Text>
    </View>
    <View style={styles.restView}>
      <Text style={styles.restText}>
        {'잔여 '}
        {item.rest}
        {'석'}
      </Text>
    </View>
  </TouchableOpacity>
);

export default RestTicket = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <View>
        <Item
          item={item}
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <Modal isVisible={modalVisible} backdropColor={'rgba(0, 0, 0, 0.4)'}>
          <View style={styles.modalView}>
            <View style={styles.iconView}>
              <Ionicons
                onPress={() => {
                  setModalVisible(false);
                }}
                name="close"
                size={24}
              />
            </View>
            <Text style={styles.modalTitle}>QED 반포</Text>
            <View style={styles.modalSubTitleView}>
              <Text style={[styles.mdoalSubTitleText, {marginRight: 12}]}>
                2022년 9월 14일
              </Text>
              <Text style={styles.mdoalSubTitleText}>10:00~10:30</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ReserveTicket');
                setModalVisible(false);
              }}
              style={styles.modalReserveButton}>
              <Text style={styles.modalReserveText}>예약하기</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <FlatList
      data={Data}
      renderItem={renderItem}
      // keyExtractor={item => item.id}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 75,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    marginRight: 10,
  },
  timeView: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeTextStart: {
    color: '#171717',
    lineHeight: 23,
    fontWeight: '400',
    fontSize: 15,
  },
  timeTextEnd: {
    color: '#A3A3A3',
    lineHeight: 19,
    fontWeight: '400',
    fontSize: 13,
  },
  restView: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restText: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#737373',
  },
  modalView: {
    paddingBottom: 25,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    // marginHorizontal: 20,
    borderRadius: 12,
  },
  iconView: {
    position: 'absolute',
    right: 26,
    top: 26,
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 27,
    color: '#262626',
    marginTop: 36,
  },
  modalSubTitleView: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mdoalSubTitleText: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 23,
    color: '#171717',
  },
  modalReserveButton: {
    height: 52,
    width: '100%',
    backgroundColor: '#171717',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  modalReserveText: {
    color: '#fff',
    lineHeight: 23,
    fontWeight: '600',
    fontSize: 15,
  },
});
