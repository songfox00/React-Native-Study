import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';

export default EditMyInfo = ({bottomSheet}) => {
  return (
    <BottomSheet hasDraggableIcon ref={bottomSheet} height={541}>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>내 정보 수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>결제내역</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>공지사항</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>문의하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    paddingHorizontal: 20,
  },
  view: {
    marginHorizontal: 20,
    borderBottomColor: '#F2F4F6',
    borderBottomWidth: 1,
  },
  button: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 23,
    color: '#171717',
  },
});
